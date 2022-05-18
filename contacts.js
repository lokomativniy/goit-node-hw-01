const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === id);
  if (!findContact) {
    return null;
  }
  return findContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const findByIndex = contacts.findIndex((contact) => contact.id === id);
  if (findByIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(findByIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
