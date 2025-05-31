import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { ZodError } from "zod";
import ExcelJS from "exceljs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      res.status(201).json({ 
        success: true, 
        message: "Lead created successfully",
        lead: {
          id: lead.id,
          email: lead.email,
          twitchUsername: lead.twitchUsername,
          followersRange: lead.followersRange,
          streamingDuration: lead.streamingDuration,
          streamingSoftware: lead.streamingSoftware,
          language: lead.language,
          createdAt: lead.createdAt
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.issues 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all leads
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getAllLeads();
      res.json({ success: true, leads });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch leads" 
      });
    }
  });

  // Export leads to Excel
  app.get("/api/leads/export", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      let leads;

      if (startDate && endDate) {
        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        leads = await storage.getLeadsByDateRange(start, end);
      } else {
        leads = await storage.getAllLeads();
      }

      // Create Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('StreamBot Leads');

      // Add headers
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Twitch Username', key: 'twitchUsername', width: 20 },
        { header: 'Followers Range', key: 'followersRange', width: 15 },
        { header: 'Streaming Duration', key: 'streamingDuration', width: 20 },
        { header: 'Streaming Software', key: 'streamingSoftware', width: 20 },
        { header: 'Language', key: 'language', width: 10 },
        { header: 'Created At', key: 'createdAt', width: 20 }
      ];

      // Style the header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '3B82F6' }
      };

      // Add data
      leads.forEach(lead => {
        worksheet.addRow({
          id: lead.id,
          email: lead.email,
          twitchUsername: lead.twitchUsername,
          followersRange: lead.followersRange,
          language: lead.language.toUpperCase(),
          createdAt: lead.createdAt.toISOString()
        });
      });

      // Auto-fit columns
      worksheet.columns.forEach(column => {
        if (column.eachCell) {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, (cell) => {
            const cellLength = cell.value ? cell.value.toString().length : 10;
            if (cellLength > maxLength) {
              maxLength = cellLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength + 2;
        }
      });

      // Set response headers
      const filename = `streambot-leads-${new Date().toISOString().split('T')[0]}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      // Write to response
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Excel export error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to export leads" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
