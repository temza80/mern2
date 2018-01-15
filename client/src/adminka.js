

//CommentBox.js
import React, { Component } from 'react';
import styles from './adminka.css';

class	TestSelect extends	Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
       this.onSendValue = this.onSendValue.bind(this);
    }
    onChangeHandler(e){
        this.setState({selectedValue:e.target.options[e.target.selectedIndex].value});

    }
    onSendValue(e)
    {

        let param;
        if(this.state.selectedValue==='') param=this.props.firstId;
        else param=this.state.selectedValue;
        fetch('/api/putinbase', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                param: param,

            })
        })
    }

    render(){
        console.log(this.props.data)
         if(this.props.data.length){
        let cities=this.props.data.map(function(item,index)
            {
                return <option  key={index} value={item.id}>{item.name+'-'+item.country}</option>;
            }

        )
        return	(
            <div>
            <select className={styles.select} onChange={this.onChangeHandler}>
                {this.state.selectedValue}
                {cities}

            </select>
            <button className={styles.button} onClick={this.onSendValue}>Send</button>
            </div>

        );
    }
    else return(<div />)
    }
}
class	TestInput extends	Component{
    constructor(props) {
        super(props);
        this.state = { forSel: [], myValue:'', firstId:''}
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler(e){
        this.setState({myValue:	e.target.value})
        console.log(e.target.value)
        fetch('/api/lil', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                param: e.target.value,

            })
        })
            .then( res => {console.log(res); return res.json()})
            .then(lil =>{ if(lil.answer!=="no") this.setState({ forSel:lil, firstId:lil[0].id})
            else this.setState({ forSel: [],  firstId:''})


             }).catch(err => console.log(err))
        ;





    }
    render(){
        return	(
            <div className={styles.full}>
                <input className={styles.input}
                   
                    value={this.state.myValue}
                    onChange={this.onChangeHandler}
                    placeholder='введите	значение' />

                <TestSelect data={this.state.forSel} firstId={this.state.firstId} />
            </div>
        );
    }



}
export default TestInput;
