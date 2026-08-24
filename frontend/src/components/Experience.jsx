import { useState, useRef, useEffect } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Fade,
  Grow,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import { usePortfolio } from "../context/PortfolioContext";

// Timing knobs
const HOLD_MS = 450;
const GROW_OUT_MS = 220;
const GROW_IN_MS = 420;
const FETCH_MS = 1200;
const BULLET_STEP_MS = 350;
const CONTENT_FADE_MS = 400;

// Timeline node geometry
const LABEL_BOX_HEIGHT = 20;
const LABEL_MARGIN_BOTTOM = 8;
const ICON_SIZE = 40;
const LINE_TOP = LABEL_BOX_HEIGHT + LABEL_MARGIN_BOTTOM + ICON_SIZE / 2;

// Clean Badge Style Helpers
const badgePeriodStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  fontWeight: 600,
  padding: "6px 12px",
  background: "rgba(59, 130, 246, 0.08)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  color: "#2563eb",
  borderRadius: "8px",
};

const badgeCgpaStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.78rem",
  fontWeight: 700,
  padding: "6px 12px",
  background: "rgba(16, 185, 129, 0.08)",
  border: "1px solid rgba(16, 185, 129, 0.25)",
  color: "#059669",
  borderRadius: "8px",
};

export default function Experience() {
  const { experience = [], profile = {} } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [visibleBullets, setVisibleBullets] = useState(
    experience[0]?.bullets?.length || 0
  );

  const holdTimeoutRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  const bulletIntervalRef = useRef(null);

  const current = experience[displayIndex] || experience[0] || {};

  const handleSelect = (index) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    setCardVisible(false);

    clearTimeout(holdTimeoutRef.current);
    holdTimeoutRef.current = setTimeout(() => {
      setDisplayIndex(index);
      setCardVisible(true);
      setIsFetching(true);
      setVisibleBullets(0);

      clearTimeout(fetchTimeoutRef.current);
      fetchTimeoutRef.current = setTimeout(() => {
        setIsFetching(false);
      }, FETCH_MS);
    }, HOLD_MS);
  };

  useEffect(() => {
    if (isFetching) return;

    clearInterval(bulletIntervalRef.current);
    let count = 0;
    const total = current.bullets?.length || 0;

    bulletIntervalRef.current = setInterval(() => {
      count += 1;
      setVisibleBullets(count);
      if (count >= total) clearInterval(bulletIntervalRef.current);
    }, BULLET_STEP_MS);

    return () => clearInterval(bulletIntervalRef.current);
  }, [isFetching, displayIndex]);

  useEffect(
    () => () => {
      clearTimeout(holdTimeoutRef.current);
      clearTimeout(fetchTimeoutRef.current);
      clearInterval(bulletIntervalRef.current);
    },
    []
  );

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="experience-wrapper" style={{ width: "100%" }}>
          {/* Heading */}
          <div className="eyebrow">Career Path</div>
          <h2 className="section-title">
            Professional <em>Timeline.</em>
          </h2>

          {/* Timeline Rail */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              my: 5,
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: `${LINE_TOP}px`,
                left: 0,
                right: 0,
                height: "1.5px",
                bgcolor: "#E5E7EB",
                zIndex: 0,
              }}
            />

            {experience.map((exp, index) => {
              const isActive = activeIndex === index;

              return (
                <Box
                  key={index}
                  onClick={() => handleSelect(index)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    flex: 1,
                    px: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      height: `${LABEL_BOX_HEIGHT}px`,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      mb: `${LABEL_MARGIN_BOTTOM}px`,
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        lineHeight: 1,
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        maxWidth: "100%",
                        color: isActive ? "var(--text)" : "var(--muted)",
                        opacity: isActive ? 1 : 0.75,
                      }}
                      noWrap
                    >
                      {exp.shortCompany || exp.company}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      transition: "all .3s ease",
                      bgcolor: isActive ? "#0B1120" : "#ffffff",
                      color: isActive ? "#2F80ED" : "#B7C0CC",
                      border: isActive
                        ? "1.5px solid #2F80ED"
                        : "1.5px solid #E1E6EC",
                      boxShadow: isActive
                        ? "0 8px 20px rgba(47,128,237,.25)"
                        : "none",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {isActive ? (
                      <BoltIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <BusinessCenterOutlinedIcon sx={{ fontSize: 16 }} />
                    )}
                  </Avatar>

                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                      textAlign: "center",
                      color: isActive ? "var(--blue)" : "var(--muted)",
                      mt: 1.1,
                      maxWidth: "100%",
                    }}
                    noWrap
                  >
                    {exp.role}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Experience Card */}
          <Grow
            in={cardVisible}
            timeout={cardVisible ? GROW_IN_MS : GROW_OUT_MS}
            style={{ transformOrigin: "center center" }}
          >
            <Card
              elevation={0}
              className="experience-card"
              sx={{
                width: "100%",
                borderRadius: "24px",
                background: "var(--panel)",
                border: "1px solid var(--panel-border)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 12px 40px rgba(15,23,42,0.05)",
                overflow: "hidden",
                transition: "all .35s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 20px 48px rgba(15,23,42,0.08)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 3.5, md: 4.5 } }}>
                <Fade
                  key={`${displayIndex}-${isFetching}`}
                  in
                  appear
                  timeout={CONTENT_FADE_MS}
                >
                  <Box>
                    {/* Top Header */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
                        columnGap: 3,
                        rowGap: 2,
                        alignItems: "start",
                        width: "100%",
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          mb={1}
                        >
                          <BusinessCenterOutlinedIcon
                            sx={{ fontSize: 16, color: "var(--blue)" }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontSize: "0.92rem",
                              color: "var(--blue)",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {isFetching ? (
                              <Skeleton width={120} height={18} />
                            ) : (
                              current.company
                            )}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontSize: { xs: "1.4rem", md: "1.85rem" },
                            lineHeight: 1.25,
                            color: "var(--text)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {isFetching ? (
                            <Skeleton width="60%" height={40} />
                          ) : (
                            current.role
                          )}
                        </Typography>
                      </Box>

                      {/* Period & Location */}
                      <Stack
                        alignItems={{ xs: "flex-start", md: "flex-end" }}
                        spacing={1}
                        sx={{ justifySelf: { md: "end" } }}
                      >
                        {isFetching ? (
                          <Skeleton
                            variant="rounded"
                            width={140}
                            height={32}
                            sx={{ borderRadius: "20px" }}
                          />
                        ) : (
                          <Chip
                            icon={<CalendarMonthIcon sx={{ fontSize: 14 }} />}
                            label={current.period}
                            sx={{
                              fontFamily: "var(--font-mono)",
                              fontWeight: 600,
                              fontSize: "0.78rem",
                              height: "32px",
                              borderRadius: "20px",
                              bgcolor: "#0B1120",
                              color: "#ffffff",
                              px: 0.5,
                              "& .MuiChip-icon": { color: "#ffffff" },
                              boxShadow: "0 4px 12px rgba(15,23,42,0.12)",
                            }}
                          />
                        )}

                        <Stack
                          direction="row"
                          spacing={0.6}
                          alignItems="center"
                        >
                          <LocationOnOutlinedIcon
                            sx={{ fontSize: 15, color: "var(--muted)" }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.78rem",
                              fontWeight: 500,
                              color: "var(--muted)",
                            }}
                          >
                            {isFetching ? (
                              <Skeleton width={90} height={14} />
                            ) : (
                              current.location
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>

                    <Divider
                      sx={{
                        my: 3.5,
                        borderColor: "rgba(226,232,240,0.8)",
                      }}
                    />

                    {/* Bullets Grid */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        columnGap: 4,
                        rowGap: 2.5,
                      }}
                    >
                      {isFetching
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <Stack
                              key={i}
                              direction="row"
                              spacing={1.2}
                              alignItems="center"
                            >
                              <Skeleton
                                variant="circular"
                                width={20}
                                height={20}
                              />
                              <Skeleton width="90%" height={18} />
                            </Stack>
                          ))
                        : current.bullets.map((item, index) => (
                            <Fade
                              in={index < visibleBullets}
                              timeout={400}
                              key={`${displayIndex}-${index}`}
                            >
                              <Stack
                                direction="row"
                                spacing={1.2}
                                alignItems="flex-start"
                              >
                                <Avatar
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    background: "rgba(59, 130, 246, 0.08)",
                                    border: "1px solid rgba(59, 130, 246, 0.2)",
                                    flexShrink: 0,
                                    mt: "3px",
                                  }}
                                >
                                  <ChevronRightIcon
                                    sx={{ fontSize: 14, color: "var(--blue)" }}
                                  />
                                </Avatar>

                                <Typography
                                  sx={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.92rem",
                                    fontWeight: 500,
                                    lineHeight: 1.6,
                                    color: "#475569",
                                  }}
                                >
                                  {item}
                                </Typography>
                              </Stack>
                            </Fade>
                          ))}
                    </Box>

                    <Divider
                      sx={{ my: 3.5, borderColor: "rgba(226,232,240,0.8)" }}
                    />

                    {/* Footer bar */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: isFetching ? "#F59E0B" : "#10B981",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                          }}
                        >
                          {isFetching
                            ? "Fetching Trajectory"
                            : "Verified Trajectory"}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--muted)",
                          justifySelf: "end",
                        }}
                      >
                        Node {displayIndex + 1} / {experience.length}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              </CardContent>
            </Card>
          </Grow>

          {/* Education & Certifications Cards */}
          {profile.education && (
            <Box
              sx={{
                width: "100%",
                mt: 4,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3.5,
              }}
            >
              {/* Education Card */}
              <Box
                className="skill-card"
                sx={{
                  width: "100%",
                  background: "var(--panel)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: "24px",
                  p: { xs: 3.5, sm: 4 },
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                    <Box
                      className="skill-icon"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: "rgba(59, 130, 246, 0.1)",
                        color: "var(--blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SchoolOutlinedIcon sx={{ fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography
                        className="eyebrow"
                        sx={{
                          fontSize: "0.75rem !important",
                          color: "var(--blue) !important",
                          mb: "2px !important",
                        }}
                      >
                        Education
                      </Typography>
                      <Typography
                        className="skill-category"
                        sx={{
                          fontSize: "1.15rem !important",
                          fontWeight: "700 !important",
                          color: "var(--text)",
                          lineHeight: 1.3,
                        }}
                      >
                        {profile.education.degree}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      fontWeight: 500,
                      color: "var(--muted)",
                      mt: 1,
                      mb: 2.5,
                    }}
                  >
                    {profile.education.institution}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  flexWrap="wrap"
                  sx={{ gap: "10px 12px" }}
                >
                  <span className="chip" style={badgePeriodStyle}>
                    {profile.education.period}
                  </span>
                  <span className="chip" style={badgeCgpaStyle}>
                    CGPA: {profile.education.cgpa}
                  </span>
                </Stack>
              </Box>

              {/* Certifications Card */}
              <Box
                className="skill-card"
                sx={{
                  width: "100%",
                  background: "var(--panel)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: "24px",
                  p: { xs: 3.5, sm: 4 },
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                    <Box
                      className="skill-icon"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: "rgba(20, 184, 166, 0.1)",
                        color: "var(--teal)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <WorkspacePremiumOutlinedIcon sx={{ fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography
                        className="eyebrow"
                        sx={{
                          fontSize: "0.75rem !important",
                          color: "var(--teal) !important",
                          mb: "2px !important",
                        }}
                      >
                        Certifications
                      </Typography>
                      <Typography
                        className="skill-category"
                        sx={{
                          fontSize: "1.15rem !important",
                          fontWeight: "700 !important",
                          color: "var(--text)",
                          lineHeight: 1.3,
                        }}
                      >
                        Verified Credentials
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack spacing={1.8} mt={2.5}>
                    {profile.certifications?.map((cert, i) => {
                      const title = typeof cert === "string" ? cert : cert.title;
                      const issuer = typeof cert === "string" ? "" : cert.issuer;
                      return (
                        <Stack
                          key={i}
                          direction="row"
                          spacing={1.2}
                          alignItems="flex-start"
                        >
                          <ChevronRightIcon
                            sx={{
                              fontSize: 18,
                              color: "var(--teal)",
                              mt: "2px",
                              flexShrink: 0,
                            }}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontFamily: "var(--font-display)",
                                fontSize: "0.92rem",
                                fontWeight: 600,
                                color: "var(--text)",
                                lineHeight: 1.4,
                              }}
                            >
                              {title}
                            </Typography>
                            {issuer && (
                              <Typography
                                sx={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.78rem",
                                  color: "var(--muted)",
                                  mt: 0.2,
                                }}
                              >
                                {issuer}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Box>
              </Box>
            </Box>
          )}
        </div>
      </div>
    </section>
  );
}
