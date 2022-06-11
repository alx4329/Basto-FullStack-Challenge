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
import Swal from 'sweetalert2'
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
const EditCow = ({open, cow,setCow, setOpen})=>{
    console.log(cow)
    const [localValue, setLocalValue] = React.useState(cow);
    
    // React.useEffect(()=>{
    //     if(cow){
    //         setState(cow)
    //         // console.log
    //     }
    // },[])
    
    
    const [alertState, setAlertState] = React.useState({
        type:'',
        message:''
    })
    
    
    
    const handleChange = (e)=>{
        setCow(e)
    }
    const handleLocalChange = (e)=>{
        setLocalValue({...localValue, [e.target.name]:e.target.value})
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
            // setState({
            //     id_senasa: '',
            //     type: '',
            //     weight: '',
            //     paddockName: '',
            //     deviceType: '',
            //     deviceNumber: ''
            // })
        }
        if(alertState.type!==''){
            setTimeout(()=>{
            cleanAlert();
            },5000)
        }
    },[alertState])

    const handleSubmit = async()=>{
        console.log("editando")
        if(cow.id_senasa && cow.type && cow.weight && cow.paddockName && cow.deviceType && cow.deviceNumber){
            if(cow.id_senasa?.length!==16) {
                return setAlertState({
                    type:'warning',
                    message:'El id debe tener 16 caracteres'
                })
            }
            if(!isAlphaNumeric(cow.id_senasa)) {
                return setAlertState({
                    type:'warning',
                    message:'El id debe ser alfanumerico'
                })
                
                }
            
            try{
                const newCow= await addCow({cow:cow, edit:true})
                Swal.fire('Animal agregado con exito', '', 'success')
                .then((value)=>{
                    value && window.location.reload();
                    })
                

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
                    <DialogTitle>Editar Animal</DialogTitle>
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
                            value={localValue.id_senasa}
                            onChange={(e) => {if(isAlphaNumeric(e.target.value)) handleLocalChange(e)}}
                            onBlur={(e) => {if(isAlphaNumeric(e.target.value)) handleChange(e)}}
                            helperText={cow.id_senasa.length !== 16 && 'El ID debe tener 16 caracteres alfanumericos'}
                            disabled
                        />
                        <InputLabel id="demo-name-label">Tipo de animal</InputLabel>
                            <Select
                                labelId="demo-name-label"
                                id="demo-multiple-name"
                                value={localValue.type}
                                name="type"
                                onChange={handleLocalChange}
                                onBlur={handleChange}
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
                            value={localValue.weight}
                            onChange={(e) =>{if(isNumeric(e.target.value)) handleLocalChange(e)}}
                            onBlur={(e) =>{if(isNumeric(e.target.value)) handleChange(e)}}
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
                            value={localValue.paddockName}
                            onBlur={(e) => handleChange(e)}
                            onChange={(e) => handleLocalChange(e)}
                        />
                         <InputLabel id="demo-name-label">Tipo dispositivo</InputLabel>
                            <Select
                                labelId="demo-name-label"
                                id="demo-multiple-name"
                                value={localValue.deviceType}
                                name="deviceType"
                                onChange={handleLocalChange}
                                onBlur={handleChange}
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
                            value={localValue.deviceNumber}
                            onChange={(e) => {if(isNumeric(e.target.value)) handleLocalChange(e)}}
                            onBlur={(e) => {if(isNumeric(e.target.value)) handleChange(e)}}
                        />
                                

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOpen}>Cerrar</Button>
                        <Button onClick={()=>handleSubmit()}>Editar</Button>
                    </DialogActions>
                </Dialog>
            }
            <br></br>
            {
                alertState.type.length>0 && <Stack sx={{ width: '40%' }} spacing={12}>
                            <Alert severity={alertState.type} onClose={cleanAlert}>{alertState.message}</Alert>
                        </Stack>
            }
            
        

        </>  

    )
}

export default EditCow;