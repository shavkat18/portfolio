import firebase from "firebase/app";
import 'firebase/storage'
import {upload} from './upload.js'


const firebaseConfig = {
    apiKey: "AIzaSyCxPZFvyRkOxuhDA65AtpfF44aiKLgJhMg",
    authDomain: "fe-upload-d0cbe.firebaseapp.com",
    projectId: "fe-upload-d0cbe",
    storageBucket: "fe-upload-d0cbe.appspot.com",
    messagingSenderId: "130246409930",
    appId: "1:130246409930:web:b97d63fae6b4bd8fcc7e33"
}
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', 'jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file);

            task.on('state_change', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress');
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})