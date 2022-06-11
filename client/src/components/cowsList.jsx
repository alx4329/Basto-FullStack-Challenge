import * as React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const CowsList = ({list}) => {
  
    const columns = [
        {id:'idSenasa',label:'ID Senasa',minWidth:50},
        {id: 'type', label: 'Tipo Animal', minWidth: 60 },
        {id: 'weight', label:  'Peso[kg]', minWidth: 60 },
        {id: 'paddockName', label: 'Nombre establecimiento', minWidth: 60 },
        {id: 'deviceType', label: 'Tipo de dispositivo', minWidth: 60 },
        {id: 'deviceNumber', label: 'Numero de dispositivo', minWidth: 60 },
        ];
        
        function createData(idSenasa, type, weight, paddockName, deviceType, deviceNumber) {
            const spanishType= type==='Steer'?'Novillo':type==='Bull'?'Toro':'Vaquillona';
            const spanishDeviceType= deviceType==='Necklace'?'Collar':'Caravana';
            return {idSenasa,type:spanishType,weight,paddockName,deviceType:spanishDeviceType,deviceNumber };
        }
        
        let rows = []
        if (list){
            rows=list?.map(item=>{
                return createData(item.id_senasa,item.type,item.weight,item.paddockName,item.deviceType, item.deviceNumber)
        })}
        
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
        const handleChangePage = (event, newPage) => {
        setPage(newPage);
        };
    
        const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        };
    return(
        <>
            <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align} size='small'>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
        
    </>
    )
}

export default CowsList