export function getJson() {
  const object = {
    nodes: {
      START: {
        id: 1,
        name: 'START',
        status: 'open',
        options: {
          speed: 3,
        },
        outputs: [
          {
            source: 'START',
            target: 'CHILD_1',
          },
          {
            source: 'START',
            target: 'CHILD_2',
          },
        ],
      },
      CHILD_1: {
        id: 2,
        name: 'CHILD_1',
        status: 'open',
        options: {
          speed: 5,
        },
        inputs: [
          {
            source: 'START',
            target: 'CHILD_1',
          },
        ],
        outputs: [
          {
            source: 'CHILD_1',
            target: 'RECEIVER_1',
          },
          {
            source: 'CHILD_1',
            target: 'RECEIVER_2',
          },
        ],
      },
      CHILD_2: {
        id: 3,
        name: 'CHILD_2',
        status: 'close',
        options: {
          speed: 2,
        },
        inputs: [
          {
            source: 'START',
            target: 'CHILD_2',
          },
        ],
        outputs: [
          {
            source: 'CHILD_2',
            target: 'RECEIVER_3',
          },
          {
            source: 'CHILD_2',
            target: 'RECEIVER_4',
          },
        ],
      },
      RECEIVER_1: {
        type: 'multiple',
        id: 4,
        name: 'RECEIVER_1',
        status: 'open',
        options: {
          speed: 1,
        },
        inputs: [
          {
            source: 'CHILD_1',
            target: 'RECEIVER_1',
          },
        ],
      },
      RECEIVER_2: {
        type: 'multiple',
        id: 5,
        name: 'RECEIVER_2',
        status: 'open',
        options: {
          speed: 1,
        },
        inputs: [
          {
            source: 'CHILD_1',
            target: 'RECEIVER_2',
          },
        ],
      },
      RECEIVER_3: {
        type: 'multiple',
        id: 6,
        name: 'RECEIVER_3',
        status: 'open',
        options: {
          speed: 7,
        },
        inputs: [
          {
            source: 'CHILD_2',
            target: 'RECEIVER_3',
          },
        ],
      },
      RECEIVER_4: {
        type: 'multiple',
        id: 7,
        name: 'RECEIVER_4',
        status: 'open',
        options: {
          speed: 9,
        },
        inputs: [
          {
            source: 'CHILD_2',
            target: 'RECEIVER_4',
          },
        ],
      },
    },
  };
  return object;
}
