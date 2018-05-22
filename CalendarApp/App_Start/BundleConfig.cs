using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CalendarApp.App_Start
{
    public class BundleConfig
    {

        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(
                     new ScriptBundle("~/bundles/calendar").Include(
                         "~/Scripts/jsCalendar.js",
                          "~/Scripts/jsIndex.js"
                         ));

            bundles.Add(
                     new StyleBundle("~/bundles/calendar/css").Include("~/Content/css/calendar-style.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}