import DeleteButtonTask from './DeleteButtonTask';
import EditButtonTask from './EditButtonTask';

const CardTaskContainer: React.FC<{}> = () => {
  return (
    <>
      <div
        className={`flex flex-col space-y-4 md:space-y-0 lg:mt-8 lg:flex-row lg:space-x-14 xl:space-x-20`}
      >
        <div className={'grid grid-cols-4'}>
          <div className="h-30 p6 border-1 m-5 flex flex-col rounded border-inherit text-center">
            <h1 className="text-center text-base font-bold">title form task</h1>
            <p className="text-base">description form task</p>
            <div className="flex justify-around">
              <div>
                <EditButtonTask />
              </div>
              <div>
                <DeleteButtonTask />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTaskContainer;
