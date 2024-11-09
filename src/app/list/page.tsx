import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';

const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const owner = session?.user?.email || '';
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <h2>List Contacts</h2>
            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCard
                    contact={contact}
                    notes={notes.filter(note => (note.contactId === contact.id))}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
