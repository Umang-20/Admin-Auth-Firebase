import React, {useState} from 'react';

const Form = () => {

    const [checkBox, setCheckBox] = useState({
        A: false,
        B: false,
        C: false,
        D: false,
    });

    const Handler = (event) => {
        const {name, checked} = event.target;
        setCheckBox((preValue) => {
            return {
                ...preValue,
                [name]: checked,
            }
        })
    }

    const toSubmit = () => {
        const array =[];
        Object.keys(checkBox).map((element) => {
            if(checkBox[element]===true){
                array.push(element);
            }
        })
        console.log(array);
        setCheckBox({
            A: false,
            B: false,
            C: false,
            D: false,
        });
    }

    return (
        <>
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="A" checked={checkBox.A} onChange={Handler}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        A
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="B" checked={checkBox.B}
                           id="flexCheckDefault" onChange={Handler}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        B
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="C" checked={checkBox.C}
                           id="flexCheckDefault" onChange={Handler}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        C
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="D" checked={checkBox.D}
                           id="flexCheckDefault" onChange={Handler}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        D
                    </label>
                </div>
                <div className="button">
                    <button className="btn btn-outline-primary" onClick={toSubmit}> Submit</button>
                </div>
            </div>
        </>
    );
};

export default Form;
