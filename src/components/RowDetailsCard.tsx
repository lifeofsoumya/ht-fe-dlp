const RowDetailsCard = ({ data }: { data: any }) => {
  return (
    <div className="row-details-card">
      <h3>Details for Row {data.id}</h3>
      <p><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString('en-In')}</p>
      <p><strong>System ID:</strong> {data.systemId}</p>
      <p><strong>Detection:</strong> {data.eventType}</p>
      {/* <p><strong>Status:</strong> {data.status}</p> */}
    </div>
  );
};

export default RowDetailsCard;
