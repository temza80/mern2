import React, { Component } from 'react';
import styles from './list.css';
class	List extends	Component {
    
   

    render()
    {
        var list=this.props.postList.map(function(item){
            var ctrans = 'rotate('+item.winddeg+'deg)'
    var css = {
        transform: ctrans 
    }

          
            return <tr>
            <td>{item.cname}</td>
            <td>{item.ccountry}</td>
            <td>{item.temp}</td>
            <td><img src={"http://openweathermap.org/img/w/"+item.weathericon+".png" } title={item.weatherMain} /></td>
            <td><div style={css}>&#x2191;</div></td>
            <td>{item.windspeed}</td></tr>

            }
        )

        return <div className={styles.table_wrap}><table className={styles.table}>{list}</table>
        <img className={styles.loading} src="loading.gif" id="loading_gif" visible="false" /></div>
    }
}
export default List;