import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'; // Import the default CSS for react-toggle

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [service, setService] = useState([]);
    const [serviceId, setSelectedService] = useState(null); // State variable to store selected service
    console.log(serviceId, 'huh')

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/api/getServicesById?serviceId=${serviceId}`);
                setService(response.data.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchService();

    }, [serviceId]);

    useEffect(() => {
        // Fetch orders from your API endpoint
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/getOrders'); // Replace with your actual API endpoint
                setOrders(response.data.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const data = useMemo(() => orders, [orders]);

    const columns = useMemo(
        () => [
            {
                Header: 'Service',
                accessor: 'service',
                Cell: ({ row }) => (
                    // Create a link to set the selected service when clicked
                    <button onClick={() => setSelectedService(row.original.service)}>
                    View
                        {service? service.name : <h1 className='text-black'>View Service</h1>}
                    </button>

                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Contact ',
                accessor: 'contactNumber',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Completed',
                accessor: 'isCompleted',
                Cell: ({ row }) => (
                    <Toggle
                        checked={row.original.isCompleted}
                        onChange={() => handleToggleChange(row.original._id, !row.original.isCompleted)}
                    />
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    const handleToggleChange = async (orderId, newValue) => {
        try {
            // Send a request to update the 'isCompleted' status for the order with orderId
            await axios.put(`/api/updateOrder/${orderId}`, { isCompleted: newValue }); // Replace with your actual API endpoint
            // Update the local state or refetch data if needed
            setOrders(prevOrders => prevOrders.map(order => (order._id === orderId ? { ...order, isCompleted: newValue } : order)));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="order-table-container">
            <table {...getTableProps()} className="order-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className='gap-5' {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr className='border-2 gap-5 space-x-4'{...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td className="table-cell space-x-4 gap-5 border-b-2 border-black" {...cell.getCellProps()}>{cell.render('Cell')}
                                    </td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
