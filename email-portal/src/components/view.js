import React, { Component } from 'react';
import styled from 'styled-components';
import { post } from 'axios'

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
		this.displayResults = this.displayResults(this);
	  }
	
	readFile(e) {
		const content = this.fileReader.result;
		
		this.fileUpload(content).then((response)=>{
		  this.setState({
				...this.state,
				responseDetail: response.data
			});
		})
	}
	
	handleUpload(e) {
		e.preventDefault() // Stop form submit
		
		this.fileReader = new FileReader();
		this.fileReader.onloadend = this.readFile;
		this.fileReader.readAsText(this.state.file);
	};

	onChange(e) {
		this.setState({file:e.target.files[0]})
	};

	fileUpload(content) {
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
	
	displayResults() {
		const result = this.state.responseDetail;
		
		return result ? (
			<ul>
				<li>To: {result.To}</li>
				<li>From: {result.From}</li>
				<li>Subject: {result.Subject}</li>
				<li>Date: {result.Date}</li>
			</ul>
		) : "Please submit a message";
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
									<li>To: {this.state.responseDetail.To}</li>
									<li>From: {this.state.responseDetail.From}</li>
									<li>Subject: {this.state.responseDetail.Subject}</li>
									<li>Date: {this.state.responseDetail.Date}</li>
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