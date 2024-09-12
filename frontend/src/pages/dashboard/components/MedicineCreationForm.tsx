import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Modal from '@mui/joy/Modal';
import { DialogActions, DialogContent, DialogTitle, Divider, ModalDialog } from '@mui/joy';
import { Add, DeleteForever, Warning } from '@mui/icons-material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function MedicineCreationForm() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState<boolean>(false);

    interface FormElements extends HTMLFormControlsCollection {
        name: HTMLInputElement;
        price: HTMLInputElement;
        quantity: HTMLInputElement;
        image: HTMLInputElement;
        description: HTMLInputElement;
        medicineId: HTMLInputElement;
        status: HTMLInputElement;
    }
    interface MedicineFormElement extends HTMLFormElement {
        readonly elements: FormElements;
    }

    interface IMedicine { name: string; price: string; quantity: string; image: string; description: string; status: string; medicineId: string; };

    async function handleSubmition() {
        // alert("medicine request sumbitted" + JSON.stringify(data));
        try {
            let data = window.localStorage.getItem("newMedicine") || "new medicine not updated at client side";

            await axios.post('/medicine', JSON.parse(data));
            alert("Your medicine has been updated in blockchain")
            navigate("/medicines");

            window.localStorage.removeItem("newMedicine");

        } catch (err) {
            alert(err);
            console.log(err)
            // setWarning(true);
            // setWarningMessage("Please enter correct email and password");
            // setTimeout(() => {
            //     setWarning(false);
            // }, 5000);
        }
    }

    function setDataInBrowser(newMedicine: IMedicine) {
        window.localStorage.setItem("newMedicine", JSON.stringify(newMedicine));
        setOpen(true);
    }

    return (
        <Sheet
            sx={{
                display: 'flex',
                flexFlow: 'row wordwrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: '95vh',
            }}
        >

            <form
                onSubmit={(event: React.FormEvent<MedicineFormElement>) => {
                    event.preventDefault();
                    const formElements = event.currentTarget.elements;
                    const data = {
                        name: formElements.name.value,
                        price: formElements.price.innerText,
                        quantity: formElements.quantity.value,
                        image: formElements.image.value,
                        description: formElements.description.value,
                        status: formElements.status.value,
                        medicineId: formElements.medicineId.value,
                    };
                    //   alert(JSON.stringify(data, null, 2));
                    // handleSubmition(data)

                    setDataInBrowser(data)
                }}
            >
                <Sheet
                    sx={{
                        //   width: 300,
                        mx: 'auto',
                        my: 4,
                        py: 3,
                        px: 2,
                        display: 'flex',
                        // flexDirection: 'row',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                    className="medicineForm"
                >
                    <FormControl required>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" type="text" />
                    </FormControl>
                    {/* <FormControl required>
                        <FormLabel>Type Of Medicine</FormLabel>
                        <Select placeholder="Choose one…" id="typeOfMedicine">
                            <Option value="lending">Lending</Option>
                            <Option value="borrowing">Borrowing</Option>
                        </Select>
                    </FormControl> */}
                    <FormControl required>
                        <FormLabel>Price</FormLabel>
                        <Input name="price" type="text" placeholder="price" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Quantity</FormLabel>
                        <Input name="quantity" type="number" placeholder="Quantity" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Image</FormLabel>
                        <Input name="image" type="file" placeholder="image" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Description</FormLabel>
                        <Input name="description" type="text" placeholder="description" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Status</FormLabel>
                        <Input name="status" type="text" placeholder="status" />
                    </FormControl>
                </Sheet>
                <Sheet
                    sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // minHeight: '40vh',
                    }}
                >
                    <Button
                        variant="solid"
                        color="primary"
                        startDecorator={<Add />}
                        // onClick={() => {}}
                        type="submit"
                    >
                        Secure New Medicine
                    </Button>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <Warning />
                                Confirmation
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                Are you sure you want to submit medicine into blockchain ?
                            </DialogContent>
                            <DialogActions>
                                <Button type="submit" value="submit" variant="solid" color="danger" onClick={() => { setOpen(false); handleSubmition() }}>
                                    Continue
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </Modal>
                </Sheet>
            </form>
        </Sheet>
    );
}