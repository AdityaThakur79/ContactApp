import Navbar from "./components/Navbar";
import { FaSearch, FaPlus } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./config/Firebase";
import Contact from "./components/Contact";
import AddandDeleteContacts from "./components/AddandDeleteContacts";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";
import "./index.css";

function App() {
  const [contacts, SetContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        // const contactsSnapshot = await getDocs(contactsRef);

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          SetContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    e.preventDefault();
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      SetContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto  rounded-lg wrapper">
        <div className="top">
          <AddandDeleteContacts isOpen={isOpen} onClose={onClose} />
          <Navbar />
          <div className="flex gap-2 justify-center">
            <div className="relative flex items-center">
              <FaSearch className="text-gray text-2xl absolute ml-2" />

              <input
                onChange={filterContacts}
                type="text"
                placeholder="Search Contact"
                className=" px-16 py-2 cursor-pointer h-10 flex-grow rounded-md  text-black create-Btn"
              ></input>
            </div>

            <FaPlus
              onClick={onOpen}
              className="text-3xl text-orange flex items-center cursor-pointer"
            />
          </div>
        </div>

        <div className="wrapper2">
          <div className="mt-4 flex flex-col gap-2 card-wrapper">
            {contacts.length <= 0 ? (
              <NotFoundContact />
            ) : (
              contacts.map((contact) => (
                <Contact key={contact.key} contact={contact} />
              ))
            )}
          </div>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      </div>
   
    </>
  );
}

export default App;
