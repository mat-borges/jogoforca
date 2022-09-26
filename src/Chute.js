import styled from 'styled-components';

export default function Chute(props) {
	return (
		<ChuteDiv>
			<p>Já sei a palavra!</p>
			<ChuteInput
				type={'text'}
				data-identifier="type-guess"
				disabled={props.gameStart === true ? '' : 'disabled'}
				onChange={(e) => props.setChute(e.target.value)}
				value={props.chute}></ChuteInput>
			<ChutarButton
				onClick={() => props.conferirChute(props.chute)}
				disabled={props.gameStart === true ? '' : 'disabled'}
				data-identifier="guess-button">
				Chutar
			</ChutarButton>
		</ChuteDiv>
	);
}

const ChuteDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	p {
		font-size: 14px;
	}
`;

const ChuteInput = styled.input`
	height: 20px;
	margin: 0 5px;
	width: 400px;
`;

const ChutarButton = styled.button`
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.letterBorderColor};
	border: 1px solid ${(props) => props.letterBorderColor};
	border-radius: 5px;
	width: 60px;
	height: 30px;
	margin: 0;
`;
