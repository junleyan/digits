'use client';

import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { Contact, Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';
import NoteItem from './NoteItem';

const ContactCardAdmin = ({ contact, notes }: { contact: Contact, notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Image
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        width={75}
        height={75}
        className="rounded-circle"
      />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {`${contact.firstName} ${contact.lastName}`}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <NoteItem key={note.id} note={note} />)}
      </ListGroup>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
