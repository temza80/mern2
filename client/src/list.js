import React, { Component } from 'react';
import styles from './list.css';
class	List extends	Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: []
        }
    }
    componentDidMount() {
        fetch('/api/getall').
            then(res => res.json()).
            then(posts=> this.setState({postList:posts})).catch(err => console.log(err))
    }

    render()
    {
        var list=this.state.postList.map(function(item){
            var ctrans = 'rotate('+item.wind[1]+'deg)'
    var css = {
        transform: ctrans 
    }

          
            return <tr>
            <td>{item.cName}</td>
            <td>{item.cCountry}</td>
            <td>{item.temp}</td>
            <td><img src={"http://openweathermap.org/img/w/"+item.weather.icon+".png" } title={item.weather.main} /></td>
            <td><div style={css}>&#x2191;</div></td>
            <td>{item.wind[0]}</td></tr>

            }
        )
        return <table className={styles.table}>{list}</table>
    }
}
export default List;