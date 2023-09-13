import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { NameCard } from './NameCard';
import './Basket.css';
import { Folder } from './folder';
import FileModal from './FileModal';
import axios from 'axios';

const FOLDERS = [
    { id: 1, title: 'FirstFolder' },
    { id: 2, title: 'SecondFolder' },
    { id: 3, title: 'ThirdFolder' },
    { id: 4, title: 'FourthFolder' },
    { id: 5, title: 'FifthFolder' },
    { id: 6, title: 'SixthFolder' },
    { id: 7, title: 'SeventhFolder' }
];

export const Basket = () => {
    const [files, setFiles] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/get'
        }).then((res) => {
            setFiles(res.data);
        });
    }, []);

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

    const handleClick = (item) => {
        setBasket((basket) =>
            !basket.some((e) => e.id === item.id) ? [...basket, item] : basket
        );
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="main">
            <h1 className="header">The VEC</h1>
            <div className="container">
                <div className="folders">
                    {FOLDERS.map((folder) => (
                        <Folder key={folder.id} title={folder.title} />
                    ))}
                </div>
                <div className="names">
                    {files.map((file) => (
                        <NameCard
                            draggable
                            key={file.id}
                            id={file.id}
                            name={file.name}
                            main={true}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
                <div className="basket" ref={dropRef}>
                    {basket.map((name) => (
                        <NameCard key={name.id} id={name.id} name={name.name} />
                    ))}
                    {isOver && <div>Drop Here!</div>}
                </div>
            </div>
            <div className="footer">
                <button onClick={() => handleOpen()}>Add File</button>
            </div>
            <FileModal
                open={open}
                setOpen={setOpen}
                files={files}
                setFiles={setFiles}
            />
        </div>
    );
};
