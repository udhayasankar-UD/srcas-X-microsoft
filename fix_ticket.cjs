const fs = require('fs');
let content = fs.readFileSync('src/components/ui/InternshipTicket.jsx', 'utf8');

content = content.replace(
  '{/* Heading — pops out most */}\n            <motion.h3\n              animate={{ translateZ: z.heading }}',
  '{/* Heading — pops out most */}\n            <motion.h3\n              className="ticket-heading"\n              animate={{ translateZ: z.heading }}'
);

content = content.replace(
  '{/* Description — pops out */}\n            <motion.p\n              animate={{ translateZ: z.desc }}',
  '{/* Description — pops out */}\n            <motion.p\n              className="ticket-desc"\n              animate={{ translateZ: z.desc }}'
);

content = content.replace(
  'import ticketBgMobile from "../../assets/tickets/mobile_BG_ticket.png";',
  'import ticketBgMobile from "../../assets/tickets/mobile_BG_ticket_real.png";'
);

content = content.replace(
  '.ticket-divider { display: none !important; }',
  `.ticket-divider { display: none !important; }
          .ticket-left { min-height: 480px !important; }
          .ticket-desc { display: none !important; }
          .ticket-heading {
            background: rgba(255, 255, 255, 0.4) !important;
            backdrop-filter: blur(8px) !important;
            padding: 12px 16px !important;
            border-radius: 12px !important;
            display: inline-block !important;
          }`
);

fs.writeFileSync('src/components/ui/InternshipTicket.jsx', content);
