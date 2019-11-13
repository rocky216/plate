import React from "react"
import {Text, View, StyleSheet} from "react-native"
import {Container, Content, H2} from "native-base"


const styles = StyleSheet.create({
  text: {
    lineHeight: 22,
    marginBottom:10
  }
})

class Agreement extends React.Component {
  static navigationOptions = ()=>({
    title: "用户协议及隐私声明"
  })

  render(){
    return (
      <Container>
        <Content>
          <H2 style={{marginTop: 20, marginBottom:10, textAlign: "center"}}>《用户协议及隐私声明》</H2>
          <Text style={{marginBottom:20, textAlign: "center"}}>日期: 2019-11-11</Text>
          <View style={{paddingLeft: 10, paddingRight: 10}}>
            <Text style={styles.text}>“智联万家物业服务”（以下简称本服务），是由高超网络服务有限公司（以下简称本公司）基于高超物业网站向加州物业业主所提供的服务。</Text>

            <Text style={styles.text}>一、 声明与承诺</Text>
            <Text style={styles.text}>1.1 您确认，在您注册成为智联万家物业用户以接受本服务条款之前，您已充分阅读、理解并接受本服务的全部内容，一旦您使用本服务，即表示您同意遵循本服务之所有约定。</Text>

            <Text style={styles.text}>1.2 您同意，本公司有权随时对本服务内容进行单方面的变更，并以在本网站公告的方式予以公布，无需另行单独通知您；若您在本服务内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的服务内容，也将遵循修改后的服务内容使用本服务；若您不同意修改后的服务内容，您应停止使用本服务。</Text>

            <Text style={styles.text}>1.3 您同意，基于运行和服务安全的需要，本公司可以暂时停止提供或者限制本服务部分功能,或提供新的功能，在任何功能减少、增加或者变化时，只要您仍然使用本服务,表示您仍然同意本服务或者变更后的服务。</Text>

            <Text style={styles.text}>1.4 您声明，在您同意接受本服务并注册成为智联万家物业用户时，您是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人、法人或其他组织；本服务内容不受您所属国家或地区的排斥。不具备前述条件的，您应立即终止注册或停止使用本服务。</Text>


            <Text style={styles.text}>二、 注册信息和隐私保护</Text>
            <Text style={styles.text}>一旦同意本服务或使用本服务，即同意本公司按照以下条款来使用和披露用户的个人信息。</Text>

            <Text style={styles.text}>2.1未成年人的特别注意事项</Text>
            <Text style={styles.text}>在阅读本服务以注册加州物业服务用户时，尚未满18周岁的用户不能使用本服务，请终止注册行为，不要向我们提供您的任何个人信息。</Text>

            <Text style={styles.text}>2.2用户名和密码</Text>
            <Text style={styles.text}>智联万家物业帐号（即智联万家物业用户名，以下简称账号）是用户使用本服务时，本公司向用户提供的唯一编号。使用本服务前，用户必须先行注册，取得本公司提供给用户的智联万家物业账号，并同意：</Text>

            <Text style={styles.text}>1） 在注册为加州物业用户时，我们会要求用户设置用户名和密码来识别用户的身份，用户仅可通过自己设置的密码来使用该账号，如果用户自己泄漏了密码，可能会丢失自己的个人识别信息，并可能导致对用户自己不利的法律后果。该账号和密码因任何原因受到潜在或现实危险时，用户应该立即和本公司取得联系，在本公司采取行动前，本公司对此不负任何责任。</Text>

            <Text style={styles.text}>2） 用户应对智联万家物业账号负责，只有用户本人可以使用智联万家物业账号，该账号不可转让、不可赠与、不可继承。在用户决定不再使用该用户名时，应向本公司申请注销（永久冻结）该用户名。</Text>

            <Text style={styles.text}>3） 用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知本公司。同时，您理解本公司对您的请求采取行动需要合理期限，因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，在此之前，对已执行的指令及(或)所导致的损失，本公司不承担任何责任。</Text>


            <Text style={styles.text}>2.3注册信息</Text>
            <Text style={styles.text}>1） 注册该账号时应向本公司提供您的真实姓名、地址、国籍、电话号码和电子邮件地址，您还可以选择来填写相关附加信息（包括但不限于您所在的省份和城市、邮政编码、身份证信息、邮箱地址和手机信息等）。为有针对性地向您提供新的服务和机会，您了解并同意本公司或您登录的其他网站将通过您的电子邮件地址或该手机通知您这些信息。</Text>

            <Text style={styles.text}>2） 依本服务注册之提示准确提供并在取得该用户名后，及时更新正确、最新及完整的资料。若有合理理由怀疑提供的资料错误、不实、过时或不完整的，本公司有权暂停或终止向用户提供部分或全部“智联万家物业服务”。</Text>

            <Text style={styles.text}>3） 所有原始键入的资料将引用为注册资料，如果因注册信息不真实及未及时更新资料而导致本服务无法提供或提供时发生任何错误等问题，用户将承担因此产生的一切后果，本公司不承担任何责任。</Text>

            <Text style={styles.text}>4） 在您注册智联万家物业帐号、使用其他本公司产品或服务，访问加州物业网页, 或参加促销和有奖游戏时，本公司会收集您的个人身份识别资料，并会将这些资料用于：改进为您提供的服务及网页内容。</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

export default Agreement