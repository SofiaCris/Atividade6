import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      doutores: [], // estado para armazenar os dados da API
    };
  }

  componentDidMount() {
    this.fetchDoutores();
  }

  fetchDoutores = async () => {
    try {
      const response = await fetch('http://localhost:3000/doutores');
      const data = await response.json();
      this.setState({ doutores: data });
    } catch (error) {
      console.error('Erro ao buscar doutores:', error);
    }
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search, doutores } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingTop: 40, paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#1E90FF' }}>
          {/* Logo e busca */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <Icon name="plane" size={40} color="#fff" />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 16, paddingHorizontal: 8, height: 40 }}>
              <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, fontSize: 16, color: '#333' }}
                placeholder="Search here ..."
                placeholderTextColor="#aaa"
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
          </View>

          {/* Boas-vindas e notificação */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                size="medium"
                source={{ uri: 'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Sunglasses&hatColor=Blue02&clotheType=Overall&clotheColor=Gray02&eyeType=Close&eyebrowType=UpDown&mouthType=Sad&skinColor=Tanned' }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Bem vindo!</Text>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Marilet</Text>
              </View>
            </View>
            <Ionicons name="notifications" size={28} color="#fff" />
          </View>
        </View>

        {/* Categorias */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Categorias</Text>
          <FontAwesome5 name="bars" size={30} color="#1E90FF" />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <View><Icon name="umbrella-beach" size={40} color="#1E90FF" /><Text>Resort</Text></View>
          <View><Icon name="tooth" size={40} color="#1E90FF" /><Text>Dentista</Text></View>
          <View><Icon name="heart" size={40} color="#1E90FF" /><Text>Cardiologista</Text></View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View><Icon name="hospital" size={40} color="#1E90FF" /><Text>Hospital</Text></View>
          <View><Icon name="ambulance" size={40} color="#1E90FF" /><Text>Emergências</Text></View>
          <View><Icon name="flask" size={40} color="#1E90FF" /><Text>Laboratório</Text></View>
        </View>

        {/* Lista de doutores */}
        <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 16 }}>Melhores Doutores</Text>
        {doutores.length > 0 ? (
          doutores.map((doc, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#87CEFA',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
                marginHorizontal: 16,
                marginBottom: 16,
                padding: 10
              }}
            >
              <Avatar rounded size="medium" source={{ uri: doc.avatar }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 18 }}>{doc.nome}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{doc.profissao}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="star" size={20} color="#FFD700" />
                  <Text style={{ marginLeft: 8 }}>{doc.nota} ({doc.reviews} Reviews)</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ marginLeft: 16, color: '#999' }}>Carregando doutores...</Text>
        )}

        {/* Rodapé */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1E90FF', paddingVertical: 10 }}>
          <View><Icon name="home" size={30} color="#fff" /><Text style={{ color: '#fff' }}>Home</Text></View>
          <View><Icon name="stethoscope" size={30} color="#fff" /><Text style={{ color: '#fff' }}>Doutores</Text></View>
          <View><Icon name="calendar" size={30} color="#fff" /><Text style={{ color: '#fff' }}>Data</Text></View>
          <View><Icon name="user" size={30} color="#fff" /><Text style={{ color: '#fff' }}>Perfil</Text></View>
        </View>
      </ScrollView>
    );
  }
}
