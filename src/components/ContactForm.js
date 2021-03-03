import React from 'react'
import './ContactForm.css';
function ContactForm() {
    return (
        <div className='contact-form'>
            <form>
                <div className='input-group'>
                    <input type='text' placeholder='Name' className='form-control' />
                </div>
                <div className='input-group'>
                    <input type='text' placeholder='E-mail' className='form-control' />
                </div>
                <div className='input-group'>
                    <input type='text' placeholder='Phone' className='form-control' />
                </div>
                <div className='input-group'>
                    <textarea placeholder='Message' className='form-control' />
                </div>
                <button type='submit' className='btn btn-1'>send</button>
            </form>
        </div>
    )
}

export default ContactForm
