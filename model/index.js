const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("model/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => contactId === id.toString());
  if (!contact) return { message: "Not found" };
  return contact;
};

const removeContact = async (contactId) => {
  let isContactIdMatch = false;
  const contacts = await listContacts();
  const list = contacts.filter(({ id }) => {
    if (contactId === id.toString()) {
      isContactIdMatch = true;
      return false;
    } else {
      return true;
    }
  });

  if (!isContactIdMatch) return { message: "Not found" };

  try {
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return { message: "contact deleted" };
  } catch (e) {
    console.log(e.message);
  }
};

const addContact = async (id, name, email, phone) => {
  if (!id || !name || !email || !phone) {
    return { message: "missing required name field" };
  }
  const contacts = await listContacts();
  const contact = { id, name, email, phone };
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, contact], null, 2)
    );
    return contact;
  } catch (e) {
    console.log(e.message);
  }
};

const updateContact = async (contactId, data) => {
  let isContactIdMatch = false;
  let contactIndexInArr = -1;
  const contacts = await listContacts();
  const list = contacts.filter((el, i) => {
    if (contactId === el.id.toString()) {
      isContactIdMatch = true;
      contactIndexInArr = i;
      return false;
    } else {
      return true;
    }
  });
  if (!isContactIdMatch) return { message: "Not found" };
  if (Object.keys(data).length === 0) return { message: "missing fields" };

  const updatedContact = { ...contacts[contactIndexInArr], ...data };

  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...list, updatedContact], null, 2)
    );
    return updatedContact;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
