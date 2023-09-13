import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Folder = ({ title }) => {
    const [basket, setBasket] = useState([]);
    const [{ isOver }, dropRef] = useDrop({
        accept: 'name',
        drop: (item) => {
            setBasket((basket) =>
                !basket.some((e) => e.id === item.id)
                    ? [...basket, item]
                    : basket
            );
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <>
            <Accordion ref={dropRef}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        {title}
                        {isOver && ' Drop Here!'}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        {basket.map((name) => (
                            <li key={name.id}>{name.name}</li>
                        ))}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
