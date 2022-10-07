import { Heading, Slide } from "spectacle";

const Memory: React.FC = () => {
  return (
    <Slide backgroundColor="background">
      <Heading>Memory</Heading>
      <div className="w-full h-2/3 flex">
          <table className="table-fixed mx-auto">
            <thead className="bg-gradient-to-r from-indigo-500 via-pink-500 to-red-500">
              <tr>
                <td>Address (HEX)</td>
                <td>Content</td>
                <td>Code reference</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0x1000</td>
                <td>Garbage</td>
                <td>Nothing yet</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>0x1008</td>
                <td>Garbage</td>
                <td>Nothing yet</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>0x1100</td>
                <td>Garbage</td>
                <td>Nothing yet</td>
              </tr>
              <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
              <tr>
                <td>0x1104</td>
                <td>Garbage</td>
                <td>Nothing yet</td>
              </tr>
            </tbody>
          </table>
        </div>
    </Slide>
  );
};

export { Memory };
