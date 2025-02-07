import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBQrZHsjg7EfD-6pVmRWmj6wvwluim4T2Q",
    authDomain: "valley-dishes.firebaseapp.com",
    projectId: "valley-dishes",
    storageBucket: "valley-dishes.appspot.com",
    messagingSenderId: "894065312920",
    appId: "1:894065312920:web:febbae192c603cbc48fced",
    measurementId: "G-QM7HDTFCZK"
};
  
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export const readUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          return user;
          // ...
        } else {
          // User is signed out
          // ...
          return false;
        }
      });
}

export const signOutUser = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

export const readUsers = () => {

}

export const updateUser = () => {

}

export const deleteUser = () => {

};

export const createOrder = () => {

};

export const readOrder = () => {

}

export const readOrders = () => {

}

export const deleteOrder = () => {

}


export const deleteOrders = () => {

}


export const user = {createUser, readUser, readUsers, updateUser, deleteUser};
export const order = {createOrder, readOrder, readOrders, deleteOrders, deleteOrders};