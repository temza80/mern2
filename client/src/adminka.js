

//CommentBox.js
import React, { Component } from 'react';
import styles from './adminka.css';
import List from "./list";
import MyMapComponent from "./gugl";


class	TestSelect extends	Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue:'',
            
             
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSendValue = this.onSendValue.bind(this);
        

    }
        
        
   
    onChangeHandler(e){

        this.setState({selectedValue:e.target.options[e.target.selectedIndex].value});
        this.props.loadMap(this.props.data[e.target.selectedIndex].coord.lon, this.props.data[e.target.selectedIndex].coord.lat,
            this.props.data[e.target.selectedIndex].name);
         

    }
    onSendValue(e)
    {
        var button=e.target;
        button.disabled=true;
        document.getElementById('loading_gif').style.visibility='visible';
       
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
        .then( res => {button.disabled=false; 
            document.getElementById('loading_gif').style.visibility='hidden'; return res.json()})

        .then(res2 => { if(res2.resp==="exist") alert("The city is alredy added");
        else if(res2.resp==="ok") this.props.renew();
    })
        .catch(err=> alert(err));
    }

    render(){
        
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
class	MainInput extends	Component{
    constructor(props) {
        super(props);
        this.state = {
        selectionItems: [],
        myValue:'',
        firstId:'',
        postList: [],
         coords:{
           lon:99, 
           lat:99, 
           name:"none"},



        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler(e){
        this.setState({myValue:	e.target.value})
        console.log(e.target.value)
        fetch('/api/citylist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                param: e.target.value,

            })
        })
            .then( res => { return res.json()})
            .then(selItems =>{  if(selItems.answer!=="no") this.setState({ selectionItems:selItems, firstId:selItems[0].id,
             coords :{lon:selItems[0].coord.lon,
                lat:selItems[0].coord.lat,name:selItems[0].name}
            })
            else this.setState({ selectionItems: [],  firstId:''})


             }).catch(err => console.log(err))
        ;





    }
    getAll()
        {
           fetch('/api/getall').
            then(res => res.json()).
            then(posts=> this.setState({postList:posts})).catch(err => console.log(err))
        }
        
     
    componentDidMount() {
        
        this.getAll();
      
    }
    loadMap(lon,lat,name)
        {
            

          this.setState({coords :{lon:lon,lat:lat,name:name}});
       
        }
    render(){
        return	(
        

            <div className={styles.full}>
            <List postList={this.state.postList}/>
                <MyMapComponent
             isMarkerShown
             coords={this.state.coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKNVQdQfUF_impqXxX2KSwOxci3pdKNwc&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
/> 
       
                <input className={styles.input}
                   
                    value={this.state.myValue}
                    onChange={this.onChangeHandler}
                    placeholder='введите	значение' />

                <TestSelect  data={this.state.selectionItems} firstId={this.state.firstId} 
                loadMap={this.loadMap.bind(this)} renew={this.getAll.bind(this)}/>
             </div>
       
        );
    }



}
export default MainInput;
