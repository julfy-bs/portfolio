import Work from '@/models/Work';
import { ActionContext } from 'vuex';
import { RootState } from '@/store';

interface WorkOpened {
  work: string;
}

export interface WorksState {
  worksList: Array<Work>,
  isWorkOpened: boolean
  workOpened: WorkOpened
}

// :WorksState
const state = () => ({
  worksList: [
    {
      id: 2,
      title: 'Крипто-конвертер валют',
      url: 'https://julfy-bs.github.io/crypto-converter/',
      description: 'Приложение для конвертации валют и ведения портфеля валют с таблицами Chart.js и автоматическим подсчетом общей стоимости кошелька.',
      skills: [
        {
          id: 0,
          title: 'HTML5',
        },
        {
          id: 1,
          title: 'CSS3',
        },
        {
          id: 2,
          title: 'SCSS',
        },
        {
          id: 3,
          title: 'Git',
        },
        {
          id: 4,
          title: 'JavaScript',
        },
        {
          id: 5,
          title: 'TypeScript',
        },
        {
          id: 6,
          title: 'Vue',
        },
      ],
    },
    {
      id: 3,
      title: 'Друзья',
      url: 'https://julfy-bs.github.io/friends/',
      description: 'Коммандный проект на курсе Яндекс Практикума для агрегатора благотворительных фондов. Написание слайдеров, сложных адаптивных форм, подключение плагинов. На проекте выступал в роли TeamLead\'а.',
      skills: [
        {
          id: 0,
          title: 'HTML5',
        },
        {
          id: 1,
          title: 'CSS3',
        },
        {
          id: 3,
          title: 'JavaScript',
          url: 'https://www.javascript.com/',
        },
      ],

    },

    {
      id: 7,
      title: 'Road club',
      url: 'https://julfy-bs.github.io/road-club/',
      description: 'Лендинг на тему велоспорта. Работа выполнена на курсе Web+ от Yandex Практикум. Является дополнительным заданием к четвертому спринту - проектному месяцу.',
      skills: [
        {
          id: 0,
          title: 'JavaScript',
        },
        {
          id: 1,
          title: 'HTML',
        },
        {
          id: 1,
          title: 'CSS',
        },
      ],
    },

    {
      id: 1,
      title: 'Место Россия',
      url: 'https://julfy-bs.github.io/mesto-project/',
      description: 'Разработка интерфейса веб-версии социальной сети, в которой пользователи делятся фотографиями. Реализация функционала добавления, удаления и лайка карточек с фотографиями; изменения данных профиля пользователя.',
      skills: [
        {
          id: 0,
          title: 'HTML5',
          url: 'https://html5.org/',
        },
        {
          id: 1,
          title: 'CSS3',
          url: 'https://www.w3.org/Style/CSS/Overview.en.html',
        },
        {
          id: 2,
          title: 'Git',
          url: 'https://git-scm.com/',
        },
        {
          id: 3,
          title: 'JavaScript',
          url: 'https://www.javascript.com/',
        },
      ],
    },

    {
      id: 6,
      title: 'Stellar Burgers',
      url: 'https://julfy-bs.github.io/stellar-burgers/',
      description: 'Учебное e-commerce приложение для бургер- ресторана. Реализована возможность логина, регистрации, восстановления и сброса пароля. С помощью drag&drop зарегистрированные пользователи могут создать заказ. В профиле пользователя реализована возможность слежения за статусом и подробностями заказа в режиме реального времени с помощью Websocket. Помимо отслеживания своих заказов, любой пользователь может посмотреть историю из последних 50 заказов.',
      skills: [
        {
          id: 0,
          title: 'React',
        },
        {
          id: 0,
          title: 'React Router',
        },
        {
          id: 0,
          title: 'Redux Toolkit',
        },
        {
          id: 0,
          title: 'JavaScript',
        },
        {
          id: 0,
          title: 'TypeScript',
        },
        {
          id: 1,
          title: 'HTML',
        },
        {
          id: 1,
          title: 'CSS',
        },
      ],
    },

    {
      id: 5,
      title: 'МБОУ АЛГОСОШ им. Фибоначчи',
      url: 'https://julfy-bs.github.io/algososh/',
      description: 'Визуализатор алгоритмов с пошаговой анимацией для отражения строки, вывода Последовательности Фибоначчи, сортировки массива с помощью перебора и пузырьком, добавления и удаления элементов в структуру данных: стек, очередь и связный список. Работа выполнена на курсе Web+ от Yandex Практикум.',
      skills: [
        {
          id: 0,
          title: 'React',
        },
        {
          id: 0,
          title: 'JavaScript',
        },
        {
          id: 0,
          title: 'TypeScript',
        },
        {
          id: 0,
          title: 'Jest',
        },
        {
          id: 0,
          title: 'Cypress',
        },
        {
          id: 1,
          title: 'HTML',
        },
        {
          id: 1,
          title: 'CSS',
        },
      ],
    },
  ],
  isWorkOpened: false,
  workOpened: {},
});

const mutations = {
  CHANGE_WORK_DISPLAY_CONDITION(state: WorksState, value?: boolean) {
    state.isWorkOpened = value || !state.isWorkOpened;
  },
  CHANGE_OPENED_WORK(state: WorksState, value: WorkOpened) {
    state.workOpened = value;
  },
};

const actions = {
  async switchWorkDisplayCondition({ commit }: ActionContext<WorksState, RootState>, value?: boolean) {
    try {
      await commit('CHANGE_WORK_DISPLAY_CONDITION', value);
    } catch (e) {
      throw new Error(e);
    }
  },
  async switchOpenedWork({ commit }: ActionContext<WorksState, RootState>, value: WorkOpened) {
    try {
      await commit('CHANGE_OPENED_WORK', value);
    } catch (e) {
      throw new Error(e);
    }
  },
};

const getters = {
  workDetailed: (state: WorksState) => state.worksList.find(item => item.title === state.workOpened.work) || [],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
