import { useEffect, useState } from "react"
import { View, Text } from "react-native"

type requestProps = {
    requestDate: Date
}

const CallAPI : React.FC<requestProps>  = ({ requestDate }) => {
    const [url, setUrl] = useState<string>('');
    const [fact, setFact] = useState<string>('');
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4d8726af77msh018e124d3dd1ccbp16e720jsne74791adaf2d',
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com'
        }
    };

    const getData = async () => {
        fetch(url, options)
            .then(response => response.text())
            .then(text => setFact(text))
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        const formattedUrl = `https://numbersapi.p.rapidapi.com/${requestDate.getMonth() + 1}/${requestDate.getDate()}/date`;
        setUrl(formattedUrl);

        if (url) {
            getData();
        }
    }, [requestDate, url]);

    return(
        <View>
            <Text>{fact}</Text>
        </View>
    )
}

export default CallAPI;