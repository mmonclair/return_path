/**
* Creates the UI view, and builds API call to local service
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import { post } from 'axios'

// styles used
const StyledHeadline = styled.h1`
	{
		font-size: 1rem;
	}
`;

const ContainerDiv = styled.div`
	{
		margin: 1rem;
		padding: 1rem;
		border: 1px grey solid;
		text-align: center;
	}
`;

const SectionDiv = styled.div`
	{
		margin: 0.5rem;
		background-color: #CCC;
	}
`;

const ListItem = styled.li`
	{
		font-size: 0.75rem;
		list-style-type: none;
	}
`;

class View extends Component {
	constructor(props) {
		super(props);
		this.state ={
		  	file:null,
			responseDetail:null	
		}
		
		this.readFile = this.readFile.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.onChange = this.onChange.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
	  }
	
	// adds the contents of the file to the component state
	readFile(e) {
		const content = this.fileReader.result;
		
		this.fileUpload(content).then((response)=>{
		  this.setState({
				...this.state,
				responseDetail: response.data
			});
		})
	}
	
	// sets up a FileReader to get the file content
	handleUpload(e) {
		e.preventDefault();
		
		this.fileReader = new FileReader();
		this.fileReader.onloadend = this.readFile;
		this.fileReader.readAsText(this.state.file);
	};
	
	// form field handler for file upload
	onChange(e) {
		this.setState({file:e.target.files[0]})
	};
	
	// sets up and executes API call
	fileUpload(content) {
		// local API call, using Axios
		const url = 'http://localhost:8080/submit';
		const config = {
			headers: {
				'content-type': 'text/plain',
			}
		}
		
		return post(
            url, {
            headers: {
                'accept': 'text/plain',
                'accept-language': 'en_US',
                'content-type': 'text/plain'
            }, 
			body: content
        }, config );
	};
	
	render() {
		return (
			<ContainerDiv>
				<SectionDiv>
					<StyledHeadline>
						Upload Form goes here
					</StyledHeadline>
					<div>
					<form onSubmit={this.handleUpload}>
						<input type="file" onChange={this.onChange} />
						<button type="submit">Click</button>
					</form>
				</div>
				</SectionDiv>
				<SectionDiv>
					<StyledHeadline>
						API response display goes here
					</StyledHeadline>
					<div>
						{
							this.state.responseDetail ? (
								<ul>
									<ListItem><b>To</b>: {this.state.responseDetail.To}</ListItem>
									<ListItem><b>From:</b> {this.state.responseDetail.From}</ListItem>
									<ListItem><b>Subject:</b> {this.state.responseDetail.Subject}</ListItem>
									<ListItem><b>Date:</b> {this.state.responseDetail.Date}</ListItem>
								</ul>
							) : "Please submit a message"
						}
					</div>
				</SectionDiv>
			</ContainerDiv>
		); 
	}
};

export default View;