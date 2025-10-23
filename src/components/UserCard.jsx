const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, profile } = user;
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm my-4">
        <figure className="px-10 pt-10">
          <img src={profile} alt="user image" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{age + ", " + gender}</p>
          <div className="card-actions">
            <button className="btn btn-primary mx-1">Ignore</button>
            <button className="btn btn-primary mx-1">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
