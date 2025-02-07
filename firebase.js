// Import required Firebase modules
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, addDoc, deleteDoc, enableIndexedDbPersistence, getDocs, query, orderBy, limit, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC6naHphemz813TZnXuPClKMROleuDPxIw",
    authDomain: "mynutrition-72ada.firebaseapp.com",
    projectId: "mynutrition-72ada",
    storageBucket: "mynutrition-72ada.appspot.com",
    messagingSenderId: "1029593263014",
    appId: "1:1029593263014:web:4348ce8a6dfce7919dfd67",
    measurementId: "G-ZCENKRJEGB"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  // Enable IndexedDB persistence for offline support
  await enableIndexedDbPersistence(db).catch((err) => {
    console.error("IndexedDB persistence error:", err.code);
  });
  
  // Authentication Functions
  export const createUser = async (username, email, password, setToast, setError) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setToast(user.displayName);
      await addUser({
        name: user.displayName,
        username,
        email: user.email,
        photoURL: user.photoURL,
        isPremium: false,
        cart: null,
      });
    } catch (error) {
      setError(error.message);
    }
  };
  
  export const signInUser = async (email, password, setToast, setError) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setToast(user.displayName);
    } catch (error) {
      setError(error.message);
    }
  };
  
  export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful:", result.user.email);
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };
  
  export const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };
  
  export const updateUserProfile = async (data) => {
    try {
      await updateProfile(auth.currentUser, data);
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDoc, data);
    } catch (error) {
      console.error("Update profile error:", error.message);
    }
  };
  
  // Monitor Authentication State
  export const useAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return unsubscribe; // Cleanup on unmount
    }, []);
  
    return user;
  };
  
  
  // Firestore User Functions
  const usersCollectionRef = collection(db, "users");
  
  export const addUser = async (userData) => {
    try {
      const docRef = await addDoc(usersCollectionRef, userData);
      console.log("User added with ID:", docRef.id);
    } catch (error) {
      console.error("Add user error:", error.message);
    }
  };
  
  export const getUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such user document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };
  
  export const getUsers = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  
  export const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };
  
  // Firestore Product Functions
  const productsCollectionRef = collection(db, "products");
  
  export const addProduct = async (productData) => {
    try {
      const docRef = await addDoc(productsCollectionRef, productData);
      console.log("Product added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };
  
  export const getProducts = async (pagination, setProducts) => {
    try {
      const q = query(productsCollectionRef, orderBy("name"), limit(pagination));
      const products = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  
  export const getProduct = async (productId, setProduct) => {
    try {
      const productDocRef = doc(db, "products", productId);
      const productDoc = await getDoc(productDocRef);
      if (productDoc.exists()) {
        setProduct({ id: productDoc.id, ...productDoc.data() });
      } else {
        console.log("No such product found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };
  
  // Firestore Blog Functions
  const blogPostsCollectionRef = collection(db, "blogs");
  
  export const addBlogPost = async (blogData) => {
    try {
      const docRef = await addDoc(blogPostsCollectionRef, blogData);
      console.log("Blog post added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding blog post:", error.message);
    }
  };
  
  export const getBlogs = async (pagination, setBlogs) => {
    try {
      const q = query(blogPostsCollectionRef, limit(pagination));
      const blogs = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };
  
  export const getBlogPost = async (blogId, setBlog) => {
    try {
      const blogDocRef = doc(db, "blogs", blogId);
      const blogDoc = await getDoc(blogDocRef);
      if (blogDoc.exists()) {
        setBlog({ id: blogDoc.id, ...blogDoc.data() });
      } else {
        console.log("No such blog post found!");
      }
    } catch (error) {
      console.error("Error fetching blog post:", error.message);
    }
  };
  
  // Storage Functions
  export const uploadFile = async (file, storagePath) => {
    try {
      const fileRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(fileRef, file);
      console.log("File uploaded successfully:", snapshot.metadata.fullPath);
      return snapshot.metadata.fullPath;
    } catch (error) {
      console.error("File upload error:", error.message);
    }
  };
  
  
  // Download a file from Firebase Storage
  export const downloadFile = async (storagePath) => {
    try {
      const storageRef = ref(storage, storagePath);
      const url = await getDownloadURL(storageRef);
      console.log("File download URL:", url);
      return url; // Return the download URL
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };
  
  // Delete a file from Firebase Storage
  export const deleteFile = async (storagePath) => {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  };




  ////////////////////////////////////
  // Firestore Contact Functions
//contacts
export const addContact = async (data, setToast, setError) => {
  const contactsDocRef = doc(db, "contacts");
  await addDoc(contactsDocRef, data).then(async (userCredential) => {
    setToast("Thank you for contacting us! We will get back to you soon");
  })
  .catch(async (error) => {
    const errorMessage = await error.message;
    setError(errorMessage);
  });
};