import secure from './images/secure.png'
import speed from './images/speed.png'
import smart from './images/smart.png'
import customize from './images/customize.png'

export const category = {
  secure: {
    image: secure,
    list: [
      'validate_cv_using_blockchain',
      'secure_your_infomation',
      'prevent_cyber_attacks',
      'proof_of_authority'
    ]
  },
  speed: {
    image: speed,
    list: ['using_ethereum_2.0', '15_transaction_per_second', 'upgradeable', 'multiple_layer']
  },
  smart: {
    image: smart,
    list: ['connect_employee_and_business', 'cloud_computing', 'machine_learning', 'chatbot']
  },
  customize: {
    image: customize,
    list: [
      'customize_your_cv_to_your_style',
      'drag_and_drop_interface',
      'minimun_gas',
      'emotional_analysis'
    ]
  }
}
