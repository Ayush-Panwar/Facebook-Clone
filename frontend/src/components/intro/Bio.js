export default function Bio({
  infos,
  handleBioChange,
  max,
  setShowBio,
  updateDetails,
}) {
  return (
    <div className="add_bio_wrap">
      {console.log(infos)}
      {console.log(infos.bio)}
      <textarea
        placeholder="Add bio"
        name="bio"
        value={infos.bio}
        maxLength="100"
        className="textarea_blue details_input"
        onChange={handleBioChange}
      ></textarea>
      <div className="remaining">{max} charaters remaining</div>
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>Public
        </div>
        <div className="flex flex_right">
          <i className="gray_btn" onClick={() => setShowBio(false)}>
            Cancel
          </i>
          <i className="blue_btn" onClick={() => updateDetails()}>
            Save
          </i>
        </div>
      </div>
    </div>
  );
}
