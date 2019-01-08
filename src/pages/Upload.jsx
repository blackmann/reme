import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import remeBlack from "../reme-black.png"


const CLOUDINARY_UPLOAD_PRESET = "tc04qelg"
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/blackground-labs/image/upload/"

class Upload extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            currentTagInput: "",
            notification: "",
            uploading: false,
            selectedImageFile: null, // this is for previewing
            uploadFile: null,
            uploadSuccess: false
        }
    }

    addTag() {
        const _tag = this.state.currentTagInput.trim()
        if (_tag.length < 1) {
            return
        }

        // if its not in the tags already

        if (this.state.tags.indexOf(_tag) === -1) {
            this.setState({ tags: [...this.state.tags, _tag], currentTagInput: "" })
        }
    }

    removeTag(tag) {
        const _tags = this.state.tags
        _tags.splice(this.state.tags.indexOf(tag), 1)
        this.setState({ tags: _tags })
    }

    showPicker() {
        this.imageInput.click()
    }

    handleFile(e) {
        const selectedFile = e.target.files[0]
        const fileSize = selectedFile.size / 1000
        if (fileSize <= 300) {
            let fileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({ uploadFile: fileReader.result })
            };

            fileReader.readAsDataURL(selectedFile)

            const imageFile = URL.createObjectURL(selectedFile)
            this.setState({ selectedImageFile: imageFile, notification: '' })
        } else {
            this.setState({ notification: `The size of the image you selected is above the limit of 250kb. Please select another image.` })
        }
    }

    validateAndUpload() {
        if (this.state.uploading) {
            return
        }

        this.setState({uploadSuccess: false})

        if (this.state.uploadFile === null) {
            this.setState({ notification: `You did not provide an image` })
            return
        }

        if (this.state.tags.length < 1) {
            this.setState({ notification: `Provide some tags to make searching easier for this reme` })
            return
        }

        this.setState({ notification: '' })

        this.upload()
    }

    upload() {
        this.setState({ uploading: true })

        let formData = new FormData();

        formData.append("file", this.state.uploadFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        axios.post(CLOUDINARY_URL, formData)
            .then(response => {
                let itemImage = response.data.url;
                this.submitForm(itemImage)
            })
            .catch(error => {
                this.setState({uploading: false, notification: 'Failed to upload the reme. Try again!'})
            });
    }

    submitForm(media) {
        const data = {
            media,
            tags: this.state.tags
        }

        axios.post("https://reme.degreat.co.uk/api/upload/", data)
            .then(response => {
                this.setState({
                    uploadSuccess: true,
                    tags: [],
                    selectedImageFile: null,
                    uploadFile: null,
                    uploading: false
                })
            })
            .catch(error => {
                this.setState({ uploading: false, notification: 'Failed to upload the reme. Try again!' })
            })
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <img src={remeBlack} alt="Reme by GR" width="80" />
                    <br /><br />
                    <p className="title is-size-5">Upload Reme</p>

                    <div className="columns">
                        <div className="column">
                            <div className="upload-box" onClick={() => this.showPicker()} style={{ backgroundImage: `url(${this.state.selectedImageFile})` }}>
                                <p className="is-size-5">Click here to pick image</p>
                            </div>
                            <br />
                            {this.state.notification && (
                                <div className="notification is-danger">
                                    <button className="delete"
                                        onClick={() => this.setState({ notification: "" })}>
                                    </button>
                                    {this.state.notification}
                                </div>
                            )}
                        </div>

                        <div className="column">
                            <p className="title is-size-6">Keywords</p>
                            <p className="has-text-grey">Provide keywords that will make finding this reme easier. You can use the name of the item, celebrity, action, dress, text, etc. found in the image.</p>

                            <p className="has-text-weight-bold">Add as many tags as you want</p>
                            <br />
                            <div className="tags">
                                {this.state.tags.map((item, index) => {
                                    return (
                                        <span className="tag is-medium is-warning"
                                            key={index}>
                                            {item}
                                            <button className="delete is-small"
                                                onClick={() => this.removeTag(item)}></button>
                                        </span>
                                    )
                                })}
                            </div>

                            <div className="columns">
                                <div className="column is-three-quarters">
                                    <div className="control">
                                        <input type="text"
                                            value={this.state.currentTagInput}
                                            className="input"
                                            placeholder="Type a tag and press Enter key or Add Tag"
                                            onChange={(e) => this.setState({ currentTagInput: e.target.value })}
                                            onKeyPress={(event) => {
                                                if (event.key === "Enter") {
                                                    this.addTag()
                                                }
                                            }} />
                                    </div>
                                </div>

                                <div className="column">
                                    <button className="button" onClick={() => this.addTag()}>Add tag</button>
                                </div>
                            </div>

                            {this.state.uploading ? (
                                <button className="button is-link is-loading">Uploading</button>
                            ) : (
                            <button className="button is-link" onClick={() => this.validateAndUpload()}>
                                <i className="fas fa-cloud-upload-alt"></i>&nbsp;Upload
                            </button>
                            ) }
                            

                        </div>
                    </div>
                    {this.state.uploadSuccess && (
                        <div className="notification is-primary">
                            <button className="delete"></button>
                            Your reme has been uploaded successfully. Find it in the Recent section on the homepage.
                            <Link to="/">Go Home</Link>
                        </div>
                    )}
                </div>
                <input type="file"
                    accept="image/*"
                    name="reme-image"
                    id="reme-image"
                    ref={(node) => this.imageInput = node}
                    style={{ display: 'none' }}
                    onChange={(e) => this.handleFile(e)} />
            </section>
        )
    }
}

export default Upload