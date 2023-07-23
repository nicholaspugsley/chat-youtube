const Index = () => {
  return (
    <>
      <h1 className="jumbotron text-center square">Profile / Settings</h1>
      <div className="container-fluid">
        <h3>User Profile</h3>
        <ul>
          <li>Name</li>
          <li>Email</li>
          <li></li>
          <button className="btn btn-warning">Delete all user data </button>
          <button className="btn btn-danger">Delete all user profile </button>
        </ul>
        <h3>Subscription</h3>
        <ul>
          <li>Type</li>
          <li>Cost Per Month</li>
          <li></li>
          <button className="btn btn-primary">Pause </button>
          <button className="btn btn-danger">Cancel </button>
        </ul>
      </div>
    </>
  );
};

export default Index;
