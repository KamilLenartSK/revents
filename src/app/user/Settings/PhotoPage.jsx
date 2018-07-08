import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {
    Image,
    Segment,
    Header,
    Divider,
    Grid,
    Button,
    Card,
    Icon
} from 'semantic-ui-react';
import * as dispatchActions from '../userActions.jsx';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import {toastr} from 'react-redux-toastr'
class PhotosPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            fileName: '',
            cropResult: null,
            image: {}
        }
    }

    onDrop = files => {
        this.setState(() => {
            return {files, fileName: files[0].name}
        });
    }
    cancelCrop = () => {
        this.setState(() => {
            return {files: [], image: {}}
        })
    }
    onCropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this
            .refs
            .cropper
            .getCroppedCanvas()
            .toBlob(blob => {
                let imageURL = URL.createObjectURL(blob)
                this.setState(() => {
                    return {cropResult: imageURL, image: blob}
                })
            }, 'image/jpeg');
    }

    uploadImage = async() => {
        try {
            await this
                .props
                .uploadProfileImage(this.state.image, this.state.fileName);
            this.cancelCrop();
            toastr.success('Success', 'Photo has been uploaded')
        } catch (error) {
            toastr.error('oops', error.message);
        }
    }

    onPhotoDelete = photo => async() => {
        try {
            this
                .props
                .deletePhoto(photo);
                toastr.success('Success', ' photo deleted')
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    onSetMainPhoto = photo => async() => {
        try {
            this
                .props
                .setMainPhoto(photo)
            toastr.success('Success', ' main photo set')
        } catch (error) {
            toastr.error('Oops', error.message)
        }
    }

    filterPhotos = (photos = [], profReference) => {
        let arr = []
        if (photos.length > 0) {
            arr = photos.filter(photo => photo.url !== profReference.photoURL)
        }
        return arr
    }

    render() {
        const {photos, profile,loading} = this.props;
      
        const filteredPhotos = this.filterPhotos(photos, profile)
        const photosArray = filteredPhotos.map(photo => (
            <Card key={photo.id}>
                <Image src={photo.url}/>
                <div className='ui two buttons'>
                    <Button basic color='green' onClick={this.onSetMainPhoto(photo)}>Main</Button>
                    <Button basic icon='trash' color='red' onClick={this.onPhotoDelete(photo)}/>
                </div>
            </Card>
        ))

        return (
            <Segment>
                <Header dividing size='large' content='Your Photos'/>
                <Grid>
                    <Grid.Row/>
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div
                                style={{
                                paddingTop: '14px',
                                textAlign: 'center'
                            }}>
                                <Icon name='upload' size='huge'/>
                                <Header content='Drop image here or click to add'/>
                            </div>
                        </Dropzone>
                    </Grid.Column>

                    <Header sub color='teal' content='Step 2 - Resize image'/>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        {this.state.files[0] && <Cropper
                            style={{
                            height: '10vh',
                            width: '100%'
                        }}
                            ref={'cropper'}
                            src={this.state.files[0].preview}
                            aspectRatio={1}
                            viewMode={0}
                            dragMode={'move'}
                            guides={false}
                            scalable={true}
                            cropBoxMovable={true}
                            cropBoxResizable={true}
                            crop={this.onCropImage}/>}
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload'/> {this.state.files[0] && <div>
                            <Image
                                style={{
                                minHeight: '5vh',
                                minWidth: '5vw'
                            }}
                                src={this.state.cropResult}/>
                            <Button.Group>
                                <Button
                                loading={loading}
                                    onClick={this.uploadImage}
                                    style={{
                                    width: '300px'
                                }}
                                    positive
                                    icon='check'/>
                                <Button
                                disabled={loading}
                                    onClick={this.cancelCrop}
                                    style={{
                                    width: '300px'
                                }}
                                    positive
                                    icon='close'/>
                            </Button.Group>
                        </div>}
                    </Grid.Column>

                </Grid>

                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image src={profile.photoURL || '/assets/user.png'}/>
                        <Button positive>Main Photo</Button>
                    </Card>
                    {photosArray}

                </Card.Group>
            </Segment>
        );
    }
}
const mapStateToProps = ({firebase, firestore,async}) => {
    return {auth: firebase.auth, profile: firebase.profile, photos: firestore.ordered.photos,loading:async.loading}
}
const query = ({auth}) => {
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [
                {
                    collection: 'photos'
                }
            ],
            storeAs: 'photos'
        }
    ]
}

export default compose(connect(mapStateToProps, dispatchActions), firestoreConnect(auth => query(auth)))(PhotosPage);