import React, { useState, useRef, useCallback } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const InputForm = () => {
    const [treeDetail, setTreeDetail] = useState({
        TreeName: '',
        TreeSpecies: '',
        TreeAge: '',
        Description: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const qrCodeRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreeDetail((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const qrCodeValue = `Name: ${treeDetail.TreeName}, Species: ${treeDetail.TreeSpecies}, Age: ${treeDetail.TreeAge}, Description: ${treeDetail.Description}`;

    const downloadQRCode = useCallback(() => {
        if (qrCodeRef.current) {
            toPng(qrCodeRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'QRCode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch((error) => console.error('Error generating QR Code:', error));
        }
    }, []);

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit} className="inputform col-md-6 mt-5">
                    <h4>Tree Name</h4>
                    <input
                        type="text"
                        name="TreeName"
                        id="TreeName"
                        value={treeDetail.TreeName}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <br />

                    <h4>Tree Species</h4>
                    <input
                        type="text"
                        name="TreeSpecies"
                        id="TreeSpecies"
                        value={treeDetail.TreeSpecies}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <br />

                    <h4>Tree Age</h4>
                    <input
                        type="number"
                        name="TreeAge"
                        id="TreeAge"
                        value={treeDetail.TreeAge}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <br />

                    <h4>Description</h4>
                    <input
                        type="text"
                        name="Description"
                        id="Description"
                        value={treeDetail.Description}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <br />

                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </form>

                {isSubmitted && (
                    <div className="qrdiv col-md-6 mt-5 text-center">
                        <div ref={qrCodeRef} style={{ background: 'white', padding: '10px' }}>
                            <QRCode value={qrCodeValue} size={256} fgColor="green" />
                        </div>
                        <button className="btn btn-primary mt-2" onClick={downloadQRCode}>
                            Download QR Code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputForm;
