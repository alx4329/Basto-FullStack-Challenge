import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import {addCow} from '../actions/actions';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {isNumeric,isAlphaNumeric} from '../utils/validations';
import { spanishTypes, deviceTypes } from '../utils/constants';
import { useNavigate } from "react-router-dom";
import { createdAlert } from '../utils/swalActions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const emptyState={
    id_senasa: '',
    type: '',
    weight: '',
    paddockName: '',
    deviceType: '',
    deviceNumber: '',
    title:'',
}
//COMPONENT
const AddCow = (props)=>{
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(emptyState)

    if(Object.keys(props).length>0 ) setState(props)
    
    const [alertState, setAlertState] = React.useState({
        type:'',
        message:''
    })
    
    
    
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleClose = ()=>{
        setOpen(!open);
        setState(emptyState)
    }
    const handleOpen = () => {
        setOpen(!open);
    }
    const cleanAlert = ()=>{
        setAlertState({
            type:'',
            message:''
        })
    }
    React.useEffect(()=>{
        if(alertState.type==="success"){
            setState(emptyState)
        }
        if(alertState.type!==''){
            setTimeout(()=>{
            cleanAlert();
            },5000)
        }
    },[alertState])

    const handleSubmit = async()=>{
        if(state.id_senasa && state.type && state.weight && state.paddockName && state.deviceType && state.deviceNumber){
            if(state.id_senasa?.length!==16) {
                return setAlertState({
                    type:'warning',
                    message:'El id debe tener 16 caracteres'
                })
            }
            if(state.deviceNumber?.length!==8) {
                return setAlertState({
                    type:'warning',
                    message:'El numero debe tener 8 caracteres'
                })
            }
            if(!isAlphaNumeric(state.id_senasa)) {
                return setAlertState({
                    type:'warning',
                    message:'El id debe ser alfanumerico'
                })
                
                }
            
            try{
                const newCow= await addCow({cow:state})
                createdAlert()
                
            }catch(e){
                if(e.response.data.error) {
                    setAlertState({
                        message:e.response.data.error,
                        type:'error'
                    })}
                else if(e.message) {
                    setAlertState({
                        message: e.message,
                        type:'error'
                    })}
                else setAlertState({
                    message:"Error desconocido",
                    type:'error'
                })
                
            }
            setOpen(!open)
        }else{
            setAlertState({
                message:"Debe completar todos los campos",
                type:'warning'
        })
        }
    }
    return(
        <>
            {
                <Dialog open={open} onClose={handleOpen}>
                    <DialogTitle>Agregar Animal</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Datos:</DialogContentText>
                        <TextField
                            autoFocus
                            name="id_senasa"
                            margin="dense"
                            id="id_senasa"
                            label="ID Senasa"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={state.id_senasa}
                            onChange={(e) => {if(isAlphaNumeric(e.target.value)) handleChange(e)}}
                            helperText={state.id_senasa.length !== 16 && 'El ID debe tener 16 caracteres alfanumericos'}
                        />
                        <InputLabel id="demo-name-label">Tipo de animal</InputLabel>
                            <Select
                                labelId="demo-name-label"
                                id="demo-multiple-name"
                                value={state.type}
                                name="type"
                                onChange={handleChange}
                                input={<OutlinedInput label="Tipo de animal" fullWidth />}
                                MenuProps={MenuProps}
                            >
                            {
                                spanishTypes.map((item)=> <MenuItem
                                                            key={item.value}
                                                            value={item.value}
                                                            >
                                                            {item.label}
                                                        </MenuItem>) 
                            }
                            </Select>
                        <TextField
                            autoFocus
                            name="weight"
                            margin="dense"
                            id="weight"
                            label="Peso"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={state.weight}
                            onChange={(e) =>{if(isNumeric(e.target.value)) handleChange(e)}}
                            InputProps={{
                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                        
                                    }}
                            
                        />
                        <TextField
                            autoFocus
                            name="paddockName"
                            margin="dense"
                            id="paddockName"
                            label="Nombre del potrero"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={state.paddockName}
                            onChange={(e) => handleChange(e)}
                        />
                         <InputLabel id="demo-name-label">Tipo dispositivo</InputLabel>
                            <Select
                                labelId="demo-name-label"
                                id="demo-multiple-name"
                                value={state.deviceType}
                                name="deviceType"
                                onChange={handleChange}
                                input={<OutlinedInput label="Tipo de dispositivo" fullWidth />}
                                MenuProps={MenuProps}
                            >
                            {
                                deviceTypes.map((item)=> <MenuItem
                                                            key={item.value}
                                                            value={item.value}
                                                            >
                                                            {item.label}
                                                        </MenuItem>) 
                            }
                            </Select>
                        <TextField
                            autoFocus
                            name="deviceNumber"
                            margin="dense"
                            id="deviceNumber"
                            label="Numero de dispositivo"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={state.deviceNumber}
                            onChange={(e) => {if(isAlphaNumeric(e.target.value)) handleChange(e)}}
                            helperText={state.deviceNumber.length !== 8 && 'El N° debe tener 8 caracteres alfanumericos'}
                        />
                                

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Button onClick={()=>handleSubmit()}>Crear</Button>
                    </DialogActions>
                </Dialog>
            }
            <br></br>
            {
                alertState.type.length>0 && <Stack sx={{ width: '40%' }} spacing={12}>
                            <Alert severity={alertState.type} onClose={cleanAlert}>{alertState.message}</Alert>
                        </Stack>
            }
            
        <Button onClick={handleOpen}>Agregar animal</Button>

        </>  

    )
}

export default AddCow;