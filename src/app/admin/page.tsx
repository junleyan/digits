import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCardAdmin from '@/components/ContactCardAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const contacts = await prisma.contact.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <h2>List Contacts (Admin)</h2>
            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {contacts.map((contact) => (
                <Col key={`Contact-${contact.id}`}>
                  <ContactCardAdmin contact={contact} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
