import styled from 'styled-components';
import alphabet from '../arrays/alphabet';

export default function Letras(props) {
	return (
		<LetrasDiv>
			{alphabet.map((l, index) => (
				<Letra
					key={index}
					onClick={() => props.selecionarLetra(index, l)}
					disabled={props.gameStart === true ? '' : 'disabled'}
					data-identifier="letter"
					backgroundColor={!props.letrasSelecionadas.includes(l) ? '#e1ecf4' : '#9faab5'}
					letterBorderColor={!props.letrasSelecionadas.includes(l) ? '#2c6a96' : '#87848a'}
					opacity={props.gameStart === true ? '1' : '0.5'}
					filter={props.gameStart === true ? '0.8' : '1'}>
					{l}
				</Letra>
			))}
		</LetrasDiv>
	);
}

const LetrasDiv = styled.div`
	width: 46vw;
	max-width: 660px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 0 auto;
`;

const Letra = styled.button`
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.letterBorderColor};
	border: 1px solid ${(props) => props.letterBorderColor};
	border-radius: 5px;
	width: 40px;
	height: 40px;
	margin: 0 10px 10px 0;
	opacity: ${(props) => props.opacity};
	&:hover {
		filter: brightness(${(props) => props.filter});
	}
`;
