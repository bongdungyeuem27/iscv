import Dimension from './RightPanel/Design/Dimension'
import Icon from './RightPanel/Design/Icon'
import ImagePreview from './RightPanel/Design/ImagePreview'
import Style from './RightPanel/Design/Style'
import Text from './RightPanel/Design/Text'

import BoxItem from './Main/Component/BoxItem'
import IconItem from './Main/Component/IconItem'
import ImageItem from './Main/Component/ImageItem'
import TextItem from './Main/Component/TextItem'

import { defaultComponent } from './config'
import IIGItem from './Main/Component/IIGItem'
import { EIIG } from 'src/types/certificate/iig'
import SkillItem from './Main/Component/SkillItem'
import Skill from './RightPanel/Design/Skills'
import { ICustomCV, ISkill } from './CustomCVContext'

type IView = {} & any

export const designTabComponents: {
  [key: string]: {
    icon: string
    view: (
      id: string,
      data: any,
      profile: any,
      selected?: string,
      list?: any[],
      setList?: any,
      cv?: any
    ) => JSX.Element
    data: any
    components: JSX.Element[]
  }
} = {
  text: {
    icon: 'fa-regular fa-text',
    view: (id, data, profile, selected, list, setList) => (
      <TextItem
        key={id}
        id={id}
        data={{ ...data }}
        selected={selected}
        list={list}
        setList={setList}
      ></TextItem>
    ),
    data: {
      ...defaultComponent.common,
      ...defaultComponent.text,
      content: 'Typing here...'
    },
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  name: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.name }}></TextItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-signature',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  iig_reading: {
    view: (id, data, profile, selected, list?: any[], setList?: any, cv?: any) => (
      <IIGItem
        key={id}
        id={id}
        data={{ ...data, employeeId: profile.id }}
        iig={cv?.certificate?.iig}
        selected={selected}
        category={EIIG.R}
      ></IIGItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-certificate',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  skill: {
    view: (id, data, profile, selected, list?: any[], setList?: any, cv?: ICustomCV) => (
      <SkillItem
        key={id}
        id={id}
        data={{ ...data, employeeId: profile.id }}
        selected={selected}
        skills={cv?.skills as ISkill[]}
      ></SkillItem>
    ),
    data: {
      ...defaultComponent.common,
      ...defaultComponent.skill
    },
    icon: 'fa-solid fa-star',
    components: [
      <Skill key={0}></Skill>,
      <Dimension key={1}></Dimension>,
      <Text key={2}></Text>,
      <Style key={3}></Style>
    ]
  },
  iig_listening: {
    view: (id, data, profile, selected, list?: any[], setList?: any, cv?: any) => (
      <IIGItem
        key={id}
        id={id}
        data={{ ...data, employeeId: profile.id }}
        iig={cv?.certificate?.iig}
        selected={selected}
        category={EIIG.L}
      ></IIGItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-certificate',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  iig_speaking: {
    view: (id, data, profile, selected, list?: any[], setList?: any, cv?: any) => (
      <IIGItem
        key={id}
        id={id}
        data={{ ...data, employeeId: profile.id }}
        iig={cv?.certificate?.iig}
        selected={selected}
        category={EIIG.S}
      ></IIGItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-certificate',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  iig_writing: {
    view: (id, data, profile, selected, list?: any[], setList?: any, cv?: any) => (
      <IIGItem
        key={id}
        id={id}
        data={{ ...data, employeeId: profile.id }}
        iig={cv?.certificate?.iig}
        selected={selected}
        category={EIIG.W}
      ></IIGItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-certificate',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  email: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.email }}></TextItem>
    ),
    data: {
      ...defaultComponent.common
    },

    icon: 'fa-solid fa-at',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  github: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.github }}></TextItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-brands fa-github',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  linkedin: {
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-brands fa-linkedin',
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.linkedin }}></TextItem>
    ),
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  phone: {
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.phone }}></TextItem>
    ),
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-phone-plus',
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  professional: {
    data: {
      ...defaultComponent.common
    },
    icon: 'fa-solid fa-sparkles',
    view: (id, data, profile) => (
      <TextItem key={id} id={id} data={{ ...data, content: profile.professional }}></TextItem>
    ),
    components: [<Dimension key={0}></Dimension>, <Text key={1}></Text>, <Style key={2}></Style>]
  },
  box: {
    data: {
      ...defaultComponent.common,
      ...defaultComponent.box
    },
    icon: 'fa-solid fa-layer-group',
    view: (id, data) => <BoxItem key={id} id={id} data={{ ...data }}></BoxItem>,
    components: [<Dimension key={0}></Dimension>, <Style key={1}></Style>]
  },
  image: {
    icon: 'fa-solid fa-image',
    data: {
      ...defaultComponent.common,
      ...defaultComponent.image
    },
    view: (id, data) => <ImageItem key={id} id={id} data={{ ...data }}></ImageItem>,
    components: [<ImagePreview key={0}></ImagePreview>, <Dimension key={1}></Dimension>]
  },
  icon: {
    data: {
      ...defaultComponent.common,
      ...defaultComponent.icon
    },
    icon: 'fa-solid fa-icons',
    view: (id, data) => <IconItem key={id} id={id} data={{ ...data }}></IconItem>,
    components: [<Icon key={0}></Icon>, <Dimension key={1}></Dimension>]
  }
}
