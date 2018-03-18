import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../utils/ReduxStore'
import { bindActionCreators } from 'redux';

class Converter extends Component {
    convertToByteArray = (data) => {
        let byte_array = [];

        for (let i = 0; i < data.length; i++){
            byte_array.push(data.charCodeAt(i));
        }

        return byte_array
    };

    xorWithKey = (data, key) => {
        let out = [];
        data = this.convertToByteArray(data);
        key = this.convertToByteArray(key);

        for(let i = 0; i < data.length; i++) {
            out.push(String.fromCharCode(data[i] ^ key[i % key.length]));
        }

        return out.join('');
    };

    encrypt = (data) => {
        try {
            const decrypted = JSON.stringify(data);
            let encrypted = btoa(this.xorWithKey(decrypted, "key"));
            return encrypted;
        }
        catch(e){
            alert('Invalid JSON')
        }
    };

    render() {

        const styles = {
            textbox: {
                gridColumn: "1",
            },
            textarea: {
                height: "40vh",
                width: "99%"
            }
        };

        return (
            <div style={styles.textbox}>
                <textarea id="text1" style={styles.textarea} readOnly value={this.encrypt(this.props.data)}/>
                <br />
                <button onClick={this.props.actions.selectBasic}>Back</button>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({ 
    data: state.data 
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
