// const User = require('../Models/User');
// const Organization = require('../models/Organization');
// const sendEmail = require('../Utils/sendEmail');  // 

// exports.inviteUser = async (req, res) => {
//     try {
//         const { email, role } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ msg: 'User already exists' });
//         }

//         const inviteLink = `${process.env.FRONTEND_URL}/accept-invite?email=${email}&org=${req.user.organizationId}`;

//         // Send invitation email
//         await sendEmail(email, 'You are invited!', `Join using this link: ${inviteLink}`);

//         res.json({ msg: 'Invitation sent' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Server error' });
//     }
// };


const crypto = require('crypto');
const sendEmail = require('../Utils/sendEmail');
const Invite = require('../models/Invite');

exports.inviteUser = async (req, res) => {
    try {
        const { email, organizationId, role } = req.body;
        const token = crypto.randomBytes(32).toString('hex');
        const invite = await Invite.create({
            email,
            organization: organizationId,
            role,
            token,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, 
        });

        const inviteLink = `${process.env.FRONTEND_URL}/invite/accept/${token}`;

        const subject = 'You are invited to join an organization/ you have assigned with the task';
        const text = `Hello, you have been invited to join an organization. Please click the link to accept the invitation: ${inviteLink}`;
        const html = `<p>Hello,</p><p>You have been invited to join an organization.</p><p><a href="${inviteLink}">Accept Invitation</a></p>`;


        await sendEmail(email, subject, text, html);

        res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send invitation' });
    }
};

exports.acceptInvite = async (req, res) => {
    try {
    const { token } = req.params;
    const { name, password } = req.body;  

    const invite = await Invite.findOne({ token, accepted: false, expiresAt: { $gt: Date.now() } });
    if (!invite) return res.status(400).json({ message: 'Invalid or expired invite token' });

    
    let user = await User.findOne({ email: invite.email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email: invite.email,
      password: hashedPassword,
      organization: invite.organization,
      role: invite.role,
    });
    await user.save();
    invite.accepted = true;
    await invite.save();
    const tokenJWT = jwt.sign(
      { id: user._id, role: user.role, organization: user.organization },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({ token: tokenJWT, user: { id: user._id, name: user.name, email: user.email, role: user.role, organization: user.organization } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Invite acceptance failed' });
  }
}
