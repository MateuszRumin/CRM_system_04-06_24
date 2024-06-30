import React, { useState, useEffect } from 'react';
import styles from './ClientTable.module.css';
import { ClientRow } from './ClientRow';
import Pagination from './Pagination';

interface Client {
  id: number,
  name: string;
  status: string;
  projects: string;
  nextPayment: string;
  addedOn: string;
}

interface ClientTableProps {
  searchTerm: string;
}

// Mock data simulating API response
const clients = [
  {
    id: 1,
    name: 'Weblance Kamil Wojnaraowski',
    status: 'Niepodjęty',
    projects: '5 aktywnych / 10 wszystkich',
    nextPayment: 'FV #1650 - 28.06.2024 - 2600 zł netto',
    addedOn: '01.06.2024 - Organiczny',
  },
  {
    id: 2,
    name: 'TechCorp Anna Nowak',
    status: 'W trakcie',
    projects: '3 aktywne / 8 wszystkich',
    nextPayment: 'FV #1651 - 15.07.2024 - 3200 zł netto',
    addedOn: '12.05.2024 - Polecenie',
  },
  {
    id: 3,
    name: 'Innova Solutions Piotr Kowalski',
    status: 'Stracony',
    projects: '0 aktywnych / 6 wszystkich',
    nextPayment: 'FV #1652 - 10.08.2024 - 4500 zł netto',
    addedOn: '03.06.2024 - Organiczny',
  },
  {
    id: 4,
    name: 'AlphaTech Janina Walczak',
    status: 'Niepodjęty',
    projects: '4 aktywne / 9 wszystkich',
    nextPayment: 'FV #1653 - 01.09.2024 - 2300 zł netto',
    addedOn: '25.05.2024 - Polecenie',
  },
  {
    id: 5,
    name: 'Beta Solutions Marek Kaczmarek',
    status: 'W trakcie',
    projects: '6 aktywnych / 15 wszystkich',
    nextPayment: 'FV #1654 - 12.07.2024 - 5600 zł netto',
    addedOn: '20.06.2024 - Organiczny',
  },
  {
    id: 6,
    name: 'Delta Innovations Agnieszka Lewandowska',
    status: 'Zdobyty',
    projects: '0 aktywnych / 12 wszystkich',
    nextPayment: 'FV #1655 - 05.08.2024 - 3000 zł netto',
    addedOn: '18.05.2024 - Polecenie',
  },
  {
    id: 7,
    name: 'GammaTech Bartosz Nowicki',
    status: 'Niepodjęty',
    projects: '2 aktywne / 5 wszystkich',
    nextPayment: 'FV #1656 - 18.07.2024 - 1800 zł netto',
    addedOn: '30.06.2024 - Organiczny',
  },
  {
    id: 8,
    name: 'Omega Systems Karolina Kamińska',
    status: 'W trakcie',
    projects: '7 aktywnych / 14 wszystkich',
    nextPayment: 'FV #1657 - 25.07.2024 - 4700 zł netto',
    addedOn: '01.06.2024 - Polecenie',
  },
  {
    id: 9,
    name: 'Zeta Enterprises Tomasz Zieliński',
    status: 'Stracony',
    projects: '0 aktywnych / 7 wszystkich',
    nextPayment: 'FV #1658 - 08.08.2024 - 2100 zł netto',
    addedOn: '10.05.2024 - Organiczny',
  },
  {
    id: 10,
    name: 'Theta Solutions Katarzyna Wiśniewska',
    status: 'Niepodjęty',
    projects: '3 aktywne / 10 wszystkich',
    nextPayment: 'FV #1659 - 03.09.2024 - 3400 zł netto',
    addedOn: '15.06.2024 - Polecenie',
  },
  {
    id: 11,
    name: 'Sigma Innovations Michał Wójcik',
    status: 'W trakcie',
    projects: '5 aktywnych / 11 wszystkich',
    nextPayment: 'FV #1660 - 22.07.2024 - 2900 zł netto',
    addedOn: '22.06.2024 - Organiczny',
  },
  {
    id: 12,
    name: 'EpsilonTech Monika Krawczyk',
    status: 'Zdobyty',
    projects: '0 aktywnych / 8 wszystkich',
    nextPayment: 'FV #1661 - 30.08.2024 - 3700 zł netto',
    addedOn: '05.05.2024 - Polecenie',
  },
  {
    id: 13,
    name: 'Lambda Enterprises Krzysztof Woźniak',
    status: 'Niepodjęty',
    projects: '4 aktywne / 12 wszystkich',
    nextPayment: 'FV #1662 - 15.09.2024 - 4100 zł netto',
    addedOn: '28.06.2024 - Organiczny',
  },
  {
    id: 14,
    name: 'OmegaTech Jan Kowalczyk',
    status: 'W trakcie',
    projects: '6 aktywnych / 13 wszystkich',
    nextPayment: 'FV #1663 - 18.07.2024 - 2200 zł netto',
    addedOn: '10.06.2024 - Polecenie',
  },
  {
    id: 15,
    name: 'BetaTech Jakub Jankowski',
    status: 'Stracony',
    projects: '0 aktywnych / 9 wszystkich',
    nextPayment: 'FV #1664 - 02.08.2024 - 2500 zł netto',
    addedOn: '12.05.2024 - Organiczny',
  },
  {
    id: 16,
    name: 'Gamma Solutions Marta Kowalczyk',
    status: 'Niepodjęty',
    projects: '3 aktywne / 7 wszystkich',
    nextPayment: 'FV #1665 - 07.09.2024 - 3100 zł netto',
    addedOn: '05.06.2024 - Polecenie',
  },
  {
    id: 17,
    name: 'Delta Systems Łukasz Nowak',
    status: 'W trakcie',
    projects: '7 aktywnych / 10 wszystkich',
    nextPayment: 'FV #1666 - 25.07.2024 - 4600 zł netto',
    addedOn: '15.06.2024 - Organiczny',
  },
  {
    id: 18,
    name: 'Alpha Enterprises Paulina Nowicka',
    status: 'Stracony',
    projects: '0 aktywnych / 6 wszystkich',
    nextPayment: 'FV #1667 - 12.08.2024 - 2800 zł netto',
    addedOn: '18.05.2024 - Polecenie',
  },
  {
    id: 19,
    name: 'SigmaTech Adam Zieliński',
    status: 'Niepodjęty',
    projects: '2 aktywne / 5 wszystkich',
    nextPayment: 'FV #1668 - 10.09.2024 - 2000 zł netto',
    addedOn: '20.06.2024 - Organiczny',
  },
  {
    id: 20,
    name: 'InnovaTech Julia Lewandowska',
    status: 'W trakcie',
    projects: '5 aktywnych / 12 wszystkich',
    nextPayment: 'FV #1669 - 18.07.2024 - 3500 zł netto',
    addedOn: '25.05.2024 - Polecenie',
  },
  {
    id: 21,
    name: 'Epsilon Solutions Paweł Kowalski',
    status: 'Stracony',
    projects: '0 aktywnych / 10 wszystkich',
    nextPayment: 'FV #1670 - 01.08.2024 - 3900 zł netto',
    addedOn: '30.05.2024 - Organiczny',
  },
];


export const ClientTable: React.FC<ClientTableProps> = ({ searchTerm }) => {
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default items per page
  const itemsPerPageOptions: number[] = [10, 20, 30, 50]; // Options for items per page

  useEffect(() => {
    const results = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
    setCurrentPage(1); // Reset to the first page when search term changes
  }, [searchTerm]);

  // Get current clients based on pagination
  const indexOfLastClient: number = currentPage * itemsPerPage;
  const indexOfFirstClient: number = indexOfLastClient - itemsPerPage;
  const currentClients: Client[] = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Change items per page
  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imię i nazwisko / Firma</th>
            <th>Status</th>
            <th>Projekty</th>
            <th>Nadchodząca płatność</th>
            <th>Dodano</th>
            <th>Więcej</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((client, index) => (
            <ClientRow key={index} client={client} />
          ))}
        </tbody>
      </table>
      <div>
        <Pagination
          itemsPerPageOptions={itemsPerPageOptions}
          itemsPerPage={itemsPerPage}
          totalItems={filteredClients.length}
          currentPage={currentPage}
          paginate={paginate}
          changeItemsPerPage={changeItemsPerPage}
        />
      </div>
    </div>
  );
};