import React, { useEffect, useState } from "react";
import "./Form.scss";
import Saving from '../Saving';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../database/config';

export default function Forms({ onAddSession }) {
    const [user] = useAuthState(auth); // Access user object from firebase auth
    const [description, setDescription] = useState('');
    const [courtName, setCourtName] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [orgName, setOrgName] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [status, setStatus] = useState('Open');
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const courts = [
        'Horton Street Senior Centre',
        'Carling Heights Optimist Community Centre',
        'Glendale High School',
        "St. Joseph's Catholic High School",
        'Stronach Community Recreation Centre'
    ];

    useEffect(() => {
        if (user) {
            console.log('FORM Current user uid:', user.uid); // Log the uid here
        }
    }, [user]);

    const handleButtonAdd = async (event) => {
        event.preventDefault();

        if (description === '' || date === '' || hour === '' || orgName === '' || courtName === '') {
            setIsInvalid(true);
            return;
        }

        const currentDate = new Date();
        const selectedDate = new Date(`${date}T${hour}:${minute}:00`);

        if (selectedDate < currentDate) {
            setIsInvalid(true);
            return;
        }

        setIsSaving(true);

        try {
            const dateTime = selectedDate.toISOString();
            await onAddSession(description, status, courtName, dateTime, orgName, user); // Include uid when adding session
            setSuccessMessage('Session successfully added!');
            setTimeout(() => {
                setIsSaving(false);
                setSuccessMessage('');
                setDescription('');
                setStatus('Open');
                setCourtName('');
                setDate('');
                setHour('00');
                setMinute('00');
                setOrgName('');
            }, 3000);
        } catch (error) {
            console.error('Failed to add session:', error);
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className="form-page">
                <form className="form-container" onSubmit={handleButtonAdd}>
                    <h2>Create new session</h2>
                    <label>
                        {isInvalid && (
                            <div className="error-message">
                                Please fill in all fields or select a future date!
                            </div>
                        )}
                        <Saving isSaving={isSaving} successMessage={successMessage} />
                        Session Name:
                        <input
                            type='text'
                            maxLength={150}
                            placeholder='Enter a description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </label>
                    <label>
                        Court Name:
                        <select
                            value={courtName}
                            onChange={(event) => setCourtName(event.target.value)}
                        >
                            <option value="">Select a court</option>
                            {courts.map((court, index) => (
                                <option key={index} value={court}>{court}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Date:
                        <input
                            type='date'
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </label>
                    <label className="time-select">
                        Time:
                        <div className="time-select__input">
                            <select
                                value={hour}
                                onChange={(event) => setHour(event.target.value)}
                                className="time-select__hour"
                            >
                                {[...Array(24).keys()].map((h) => (
                                    <option key={h} value={h < 10 ? `0${h}` : `${h}`}>{h < 10 ? `0${h}` : `${h}`}</option>
                                ))}
                            </select>
                            :
                            <select
                                value={minute}
                                onChange={(event) => setMinute(event.target.value)}
                                className="time-select__minute"
                            >
                                <option value="00">00</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                    </label>
                    <label>
                        Organizer Name:
                        <input
                            type='text'
                            placeholder='Enter organizer name'
                            value={orgName}
                            onChange={(event) => setOrgName(event.target.value)}
                        />
                    </label>
                    <button>Add</button>
                </form>
                <div className="additional-content">
                    <div className="faq-section">
                        <div className="faq-question">Can I reserve a court through Pickleheads?</div>
                        <div className="faq-answer">
                            No, Pickleplay is separate from a facility's court reservation system. Players use Pickleheads to organize games with other players. If you'd like to reserve a court, reach out to the facility directly. We do our best to include up-to-date reservation information on every court page.
                        </div>

                        <div className="faq-question">Is there a Pickleplay mobile app?</div>
                        <div className="faq-answer">
                            We're working on it right now! Native apps for iOS and Android will be ready in the next few months. In the meantime, we designed our site to work extremely well on mobile. Players can choose to receive SMS notifications and seamlessly sign up for sessions from their phone.
                        </div>

                        <div className="faq-question">I don't see the court that we play at. What should I do?</div>
                        <div className="faq-answer">
                            You can submit a new court to our database. We typically approve new courts within 24 hours.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
