'use client';

import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { Contact } from '@prisma/client';
import Link from 'next/link';

const ContactCard = ({ contact }: { contact: Contact }) => (
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
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>

  </Card>
);

export default ContactCard;
