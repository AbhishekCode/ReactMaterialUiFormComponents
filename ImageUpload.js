import React, { Component } from "react";
import { css, StyleSheet } from "aphrodite";
import Dropzone from "react-dropzone";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import PopupWrapper from "../components/Popup/PopupWrapper";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import lang from "../helpers/lang";

const buttonStyle = {
	margin: 12,
	height: 40
};
const styles = StyleSheet.create({
	uploadImage: {
		display: "flex",
		flex: 1,
		justifyContent: "flex-start",
		alingItems: "center"
	},
	dropZone: {},
	dropZoneDiv: {
		display: "flex",
		flex: 1,
		justifyContent: "center",
		alingItems: "center",
		verticalAlign: "middle"
	},
	profilePic: {
		// maxWidth: ,
		// maxHeight: 200,
	}
});

export default class ImageUpload extends Component {
	static defaultProps = {
		renderPreview: false,
		crop: true,
		aspectRatio: { width: 1, height: 1 }
	};
	state = {
		openCropDiaglog: false
	};

	openCropDialog = () => {
		this.setState({ openCropDiaglog: true });
	};

	closeCropDialog = () => {
		this.setState({ openCropDiaglog: false });
	};

	cropAndCloseDailog = dataurl => {
		const { field } = this.props;
		const dataUrlObject = {
			type: lang.base64,
			dataurl: dataurl
		};
		field.input.onChange(dataUrlObject);
		this.setState({ openCropDiaglog: false });
	};

	onImageDrop = (filesToUpload, e) => {
		const { field, crop } = this.props;
		field.input.onChange(filesToUpload);
		if (crop) this.openCropDialog();
	};

	render() {
		const { field } = this.props;
		const label = field.label;
		const files = field && field.input ? field.input.value : null;
		let uploadedImage = files && Object.prototype.toString.call(files) === "[object Array]" ? files[0].preview : undefined;
		if (files.type == lang.base64) {
			uploadedImage = files.dataurl;
		}
		return (
			<div className={css(styles.uploadImage)}>
				<CropImage
					image={uploadedImage}
					isItOpen={this.state.openCropDiaglog}
					save={this.cropAndCloseDailog}
					cancel={this.closeCropDialog}
					aspectRatio={this.props.aspectRatio}
					open={this.openCropDialog}
				/>
				{!this.props.action && <RaisedButton label={label} onClick={() => this.dropzone.open()} style={buttonStyle} />}
				{this.props.action && <div onClick={() => this.dropzone.open()}>{this.props.action}</div>}
				<Dropzone
					name={field.name}
					ref={node => {
						this.dropzone = node;
					}}
					className={css(styles.dropZone)}
					multiple={false}
					accept={"image/*"}
					onDrop={this.onImageDrop}>
					<div className={css(styles.dropZoneDiv)}>
						{uploadedImage && this.props.renderPreview && <img className={css(styles.profilePic)} alt="uploaded" src={uploadedImage} />}
					</div>
				</Dropzone>
				{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
			</div>
		);
	}
}

class CropImage extends Component {
	_crop() {
		// image in dataUrl
		const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();

		return dataUrl;
	}

	_cropAndClose = () => {
		const url = this._crop();
		this.props.save(url);
	};

	render() {
		const { image, save, cancel, open, isItOpen, aspectRatio } = this.props;
		const actions = [
			<FlatButton label="Cancel" primary={true} onTouchTap={cancel} />,
			<FlatButton label="Save" primary={true} keyboardFocused={true} onTouchTap={this._cropAndClose} />
		];
		return (
			<PopupWrapper renderTitle={false} open={isItOpen} close={this._cropAndClose} modal={false} actions={actions}>
				<Cropper
					ref="cropper"
					src={image}
					style={{ height: 400, width: "100%" }}
					// Cropper.js options
					aspectRatio={aspectRatio.width / aspectRatio.height}
					guides={false}
					crop={this._crop.bind(this)}
				/>
			</PopupWrapper>
		);
	}
}

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || "";
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, { type: contentType });
	return blob;
}
