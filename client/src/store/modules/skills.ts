import Skill from '@/models/Skill';
import { ActionContext } from 'vuex';
import { RootState } from '@/store';

interface SkillOpened {
  skill: string;
}

export interface SkillsState {
  skillsList: Array<Skill>;
  isSkillOpened: boolean;
  skillOpened: SkillOpened;
}

// :SkillsState
const state = () => ({
  skillsList: [
    {
      id: 0,
      title: 'HTML5',
      picture: 'https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png',

    },
    {
      id: 1,
      title: 'CSS3',
      picture: 'https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png',
    }, {
      id: 2,
      title: 'PUG',
      picture: 'https://github.com/marwin1991/profile-technology-icons/assets/136815194/85880a3a-e65b-4e4b-a102-6c3f225b9aba',
    }, {
      id: 0,
      title: 'JavaScript',
      picture: 'https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png',
    }, {
      id: 0,
      title: 'TypeScript',
      picture: 'https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png',
    }, {
      id: 0,
      title: 'React',
      picture: 'https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png',
    }, {
      id: 0,
      title: 'Redux',
      picture: 'https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png',
    }, {
      id: 0,
      title: 'Vue',
      picture: 'https://user-images.githubusercontent.com/25181517/117448124-a2da9800-af3e-11eb-85d2-bd1b69b65603.png',
    }, {
      id: 0,
      title: 'Jest',
      picture: 'https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png',
    }, {
      id: 0,
      title: 'Cypress',
      picture: 'https://user-images.githubusercontent.com/68279555/200387386-276c709f-380b-46cc-81fd-f292985927a8.png',
    }, {
      id: 0,
      title: 'Node',
      picture: 'https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png',
    },
    {
      id: 0,
      title: 'Express',
      picture: 'https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png',
    },
    {
      id: 0,
      title: 'Postman',
      picture: 'https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png',
    },
    {
      id: 0,
      title: 'Npm',
      picture: 'https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png',
    },
    {
      id: 0,
      title: 'Yarn',
      picture: 'https://user-images.githubusercontent.com/25181517/183049794-a3dfaddd-22ee-4ffe-b0b4-549ccd4879f9.png',
    },
    {
      id: 0,
      title: 'Vite',
      picture: 'https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35',
    },
    {
      id: 0,
      title: 'Webpack',
      picture: 'https://user-images.githubusercontent.com/25181517/187955008-981340e6-b4cc-441b-80cf-7a5e94d29e7e.png',
    },
    {
      id: 0,
      title: 'Babel',
      picture: 'https://github.com/marwin1991/profile-technology-icons/assets/136815194/ecd443af-ebba-4af8-a46e-1bf64d863b5b',
    },
    {
      id: 0,
      title: 'Git',
      picture: 'https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png',
    },
    {
      id: 0,
      title: 'Github',
      picture: 'https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png',
    },
    {
      id: 0,
      title: 'Webstorm',
      picture: 'https://user-images.githubusercontent.com/25181517/192108893-b1eed3c7-b2c4-4e1c-9e9f-c7e83637b33d.png',
    },
    {
      id: 0,
      title: 'Figma',
      picture: 'https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png',
    },
  ],
  isSkillOpened: false,
  skillOpened: {},
});

const mutations = {
  CHANGE_SKILL_DISPLAY_CONDITION(state: SkillsState, value?: boolean) {
    state.isSkillOpened = value || !state.isSkillOpened;
  },
  CHANGE_OPENED_SKILL(state: SkillsState, value: SkillOpened) {
    state.skillOpened = value;
  },
};

const actions = {
  async switchSkillDisplayCondition({ commit }: ActionContext<SkillsState, RootState>, value?: boolean) {
    try {
      await commit('CHANGE_SKILL_DISPLAY_CONDITION', value);
    } catch (e) {
      throw new Error(e);
    }
  },
  async switchOpenedSkill({ commit }: ActionContext<SkillsState, RootState>, value: SkillOpened) {
    try {
      await commit('CHANGE_OPENED_SKILL', value);
    } catch (e) {
      throw new Error(e);
    }
  },
};

const getters = {
  skillDetailed: (state: SkillsState) => state.skillsList.find(item => item.url === state.skillOpened.skill) || [],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
